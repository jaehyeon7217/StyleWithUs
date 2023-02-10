import { OpenVidu } from "openvidu-browser";
import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import classes from "./VideoConsultant.module.css";
import Video from "../Video";
import { chatActions } from "../../../../store/chat";
import { authActions } from "../../../../store/auth";

const APPLICATION_SERVER_URL =
  process.env.NODE_ENV === "production"
    ? ""
    : "https://i8d105.p.ssafy.io/be/openvidu/";

const Consultant = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // token
  const userToken = useSelector((state) => state.auth.token);

  // 유저 아이디
  const userType = useSelector((state) => state.auth.userType);
  const user = useSelector((state) => state.auth.userData);
  const consultantId = user.consultantId;
  const nickname = userType === 1 ? user.consultantNickname : user.userNickname;

  // openvidu useState
  const [OV, setOV] = useState(<OpenVidu />);
  const [mySessionId, setMySessionId] = useState("");
  const [myUserName, setMyUserName] = useState(nickname);
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const [session, setSession] = useState(undefined);

  // 돌아가기 버튼 함수
  const pageBackHandler = () => {
    leaveSession();
    // const newLoadingStatus = true;
    // props.onChangeLoading(newLoadingStatus);
    navigate("../", { replace: true });
  };

  // openvidu 함수
  const deleteSubscriber = (streamManager) => {
    const prevSubscribers = subscribers;
    let index = prevSubscribers.indexOf(streamManager, 0);
    if (index > -1) {
      prevSubscribers.splice(index, 1);
      setSubscribers([...prevSubscribers]);
    }
  };

  const joinSession = () => {
    // 1. openvidu 객체 생성
    const newOV = new OpenVidu();
    // socket 통신 과정에서 많은 log를 남기게 되는데 필요하지 않은 log를 띄우지 않게 하는 모드
    newOV.enableProdMode();
    // 2. initSesison 생성
    const newSession = newOV.initSession();

    // 3. 미팅을 종료하거나 뒤로가기 등의 이벤트를 통해 세션을 disconnect 해주기 위해 state에 저장
    setOV(newOV);
    setSession(newSession);

    const connection = () => {
      // 4-a token 생성
      getToken().then((token) => {
        newSession
          .connect(token, { clientData: myUserName })
          .then(async () => {
            // 4-b user media 객체 생성
            newOV
              .getUserMedia({
                audioSource: false,
                videoSource: undefined,
                resolution: "1280x720",
                frameRate: 10,
              })
              .then((mediaStream) => {
                var videoTrack = mediaStream.getVideoTracks()[0];

                var newPublisher = newOV.initPublisher(myUserName, {
                  audioSource: undefined,
                  videoSource: videoTrack,
                  publishAudio: true,
                  publishVideo: true,
                  resolution: "1280x720",
                  frameRate: 60,
                  insertMode: "APPEND",
                  mirror: true,
                });
                // 4-c publish
                newPublisher.once("accessAllowed", () => {
                  newSession.publish(newPublisher);
                  setPublisher(newPublisher);
                });
              });
          })
          .catch((error) => {
            console.warn(
              "There was an error connecting to the session:",
              error.code,
              error.message
            );
          });
      });

      // 1-1 session에 참여한 사용자 추가
      newSession.on("streamCreated", (event) => {
        const newSubscriber = newSession.subscribe(
          event.stream,
          JSON.parse(event.stream.connection.data).clientData
        );

        const newSubscribers = subscribers;
        newSubscribers.push(newSubscriber);

        setSubscribers([...newSubscribers]);
      });
      // 1-2 session에서 disconnect한 사용자 삭제
      newSession.on("streamDestroyed", (event) => {
        if (event.stream.typeOfVideo === "CUSTOM") {
          deleteSubscriber(event.stream.streamManager);
        }
      });

      newSession.on("signal", (event) => {
        // {"clientData":"bingbang"}
        const userName = event.from.data.slice(15, -2);

        if (event.data.trim() !== "") {
          let today = new Date();

          let hours = today.getHours(); // 시
          let ampm = hours >= 0 && hours < 12 ? "오전" : "오후";
          hours = hours > 12 ? hours - 12 : hours;
          let minutes = today.getMinutes(); // 분
          minutes =
            minutes < 10 ? "0" + minutes.toString() : minutes.toString();

          let time = ampm + ` ${hours}:` + minutes;

          const payload = { user: userName, data: event.data, time: time };
          dispatch(chatActions.addChatting(payload));
        }
      });

      // 1-3 예외처리
      newSession.on("exception", (exception) => {
        console.warn(exception);
      });
    };
    // 4. session에 connect하는 과정
    connection();
  };

  const leaveSession = () => {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---

    const mySession = session;

    if (mySession) {
      sendLeave(mySessionId);
      mySession.disconnect();
      dispatch(authActions.endConsulting(false));
    }

    // Empty all properties...
    setOV(null);
    setSession(undefined);
    setSubscribers([]);
    setMySessionId("");
    setMyUserName(nickname);
    setMainStreamManager(undefined);
    setPublisher(undefined);

    dispatch(chatActions.leaveChatting());
  };

  const sendLeave = async (sessionId) => {
    const url = APPLICATION_SERVER_URL + "api/sessions/" + sessionId;
    const response = await axios.delete(url, {
      headers: {
        Authorization: userToken,
      },
    });
    // console.log(response.data);
    return response.data;
  };

  const getToken = async () => {
    const sessionId = await createSession(mySessionId);
    return await createToken(sessionId);
  };

  const createSession = async (sessionId) => {
    const url = APPLICATION_SERVER_URL + "api/sessions";
    const response = await axios.post(
      url,
      { customSessionId: sessionId, ConsultantId: consultantId },
      {
        headers: {
          Authorization: userToken,
        },
      }
    );
    // console.log(response.data.sessionId);
    setMySessionId(response.data.sessionId);
    return response.data.sessionId; // The sessionId
  };

  const consultantVideo = () => {
    return (
      <Fragment>
        {subscribers.map((sub, i) => (
          <div key={i} className="stream-container col-md-6 col-xs-6">
            <span>{sub.id}</span>
            <Video streamManager={sub} />
          </div>
        ))}
        {publisher !== undefined ? (
          <div className="stream-container col-md-6 col-xs-6">
            <Video streamManager={publisher} />
          </div>
        ) : null}
      </Fragment>
    );
  };

  const userVideo = () => {
    return (
      <Fragment>
        {publisher !== undefined ? (
          <div className="stream-container col-md-6 col-xs-6">
            <Video streamManager={publisher} />
          </div>
        ) : null}
        {subscribers.map((sub, i) => (
          <div key={i} className="stream-container col-md-6 col-xs-6">
            <span>{sub.id}</span>
            <Video streamManager={sub} />
          </div>
        ))}
      </Fragment>
    );
  };

  const createToken = async (sessionId) => {
    const url =
      APPLICATION_SERVER_URL + "api/sessions/" + sessionId + "/connections";
    const response = await axios.post(
      url,
      {},
      {
        headers: {
          Authorization: userToken,
        },
      }
    );
    return response.data.token; // The token
  };
  // 끝

  // 메세지를 보내기 위해서 세션을 올려보낸다.
  useEffect(() => {
    if (session !== undefined) {
      props.sessionSend(session);
    }
  }, [session]);

  return (
    <Fragment>
      <div>
        {session === undefined ? (
          <div className={classes.consultant}>
            <h2 className={classes.h2}>상담</h2>
            <div className={classes.wall}></div>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                joinSession(event);
                dispatch(authActions.startConsulting(true));
              }}
            >
              <p>
                <input
                  className="btn btn-lg btn-success"
                  name="commit"
                  type="submit"
                  value="JOIN"
                />
              </p>
            </form>
          </div>
        ) : null}

        {session !== undefined ? (
          <div id="session">
            <div id="video-container" className="col-md-6">
              {userType === 0 ? userVideo() : consultantVideo()}
              {/* {subscribers.map((sub, i) => (
                <div key={i} className="stream-container col-md-6 col-xs-6">
                  <span>{sub.id}</span>
                  <Video streamManager={sub} />
                </div>
              ))}
              {publisher !== undefined ? (
                <div className="stream-container col-md-6 col-xs-6">
                  <Video streamManager={publisher} />
                </div>
              ) : null} */}
            </div>
            <button onClick={pageBackHandler}>Back</button>
          </div>
        ) : null}
      </div>
    </Fragment>
  );
};

export default Consultant;
