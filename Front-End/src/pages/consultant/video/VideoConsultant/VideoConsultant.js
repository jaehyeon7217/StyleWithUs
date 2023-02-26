import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../../../store/auth";
import { chatActions } from "../../../../store/chat";
import cart, { cartActions } from "../../../../store/cart";
import { OpenVidu } from "openvidu-browser";
import Swal from "sweetalert2";
// component
import Video from "../Video";
// css style
import classes from "./VideoConsultant.module.css";

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
  const consultantNickname = user.consultantNickname;
  const nickname = userType === 1 ? user.consultantNickname : user.userNickname;

  // openvidu useState
  const [OV, setOV] = useState(<OpenVidu />);
  const [mySessionId, setMySessionId] = useState("");
  const [myUserName, setMyUserName] = useState(nickname);
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const [session, setSession] = useState(undefined);

  const maintainSessionId = useSelector((state) => state.auth.mySessionId);
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

        if (
          JSON.parse(event.stream.connection.data).clientData !==
          consultantNickname
        ) {
          props.getUserNickname(
            JSON.parse(event.stream.connection.data).clientData
          );
        }

        const newSubscribers = subscribers;
        newSubscribers.push(newSubscriber);

        setSubscribers([...newSubscribers]);
      });
      // 1-2 session에서 disconnect한 사용자 삭제
      newSession.on("streamDestroyed", (event) => {
        if (event.stream.typeOfVideo === "CUSTOM") {
          deleteSubscriber(event.stream.streamManager);
        }
        props.leaveUserNickname();
        dispatch(cartActions.resetCart());
      });

      newSession.on("signal:my-chat", (event) => {
        // {"clientData":"bingbang"}
        const userName = JSON.parse(event.from.data).clientData;

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

      newSession.on("signal:cart", async (event) => {
        let id = null;
        if (JSON.parse(event.from.data).clientData !== consultantNickname) {
          await axios
            .get(
              `https://i8d105.p.ssafy.io/be/user/gender/${
                JSON.parse(event.from.data).clientData
              }`,
              {
                headers: {
                  Authorization: userToken,
                },
              }
            )
            .then((response) => {
              id = response.data.userId;
            })
            .catch((error) => {
              if (error.response.status === 401) {
                Swal.fire({
                  title:
                    '<div style="font-size:24px;font-family:Apple_Gothic_Neo_Bold;font-weight:bold;">토큰 만료<div>',
                  html: '<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">다시 로그인 해주세요!</div>',
                  width: 330,
                  icon: "error",
                  confirmButtonText:
                    '<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">확인</div>',
                  confirmButtonColor: "#9A9A9A",
                }).then(() => {
                  navigate("/");
                  dispatch(authActions.logout(""));
                });
              }
            });
        }

        if (id !== null) {
          await axios
            .get(`https://i8d105.p.ssafy.io/be/item/show/${id}`, {
              headers: {
                Authorization: userToken,
              },
            })
            .then((response) => {
              dispatch(cartActions.getCart(response.data.data));
            })
            .catch((error) => {
              if (error.response.status === 401) {
                Swal.fire({
                  title:
                    '<div style="font-size:24px;font-family:Apple_Gothic_Neo_Bold;font-weight:bold;">토큰 만료<div>',
                  html: '<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">다시 로그인 해주세요!</div>',
                  width: 330,
                  icon: "error",
                  confirmButtonText:
                    '<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">확인</div>',
                  confirmButtonColor: "#9A9A9A",
                }).then(() => {
                  navigate("/");
                  dispatch(authActions.logout(""));
                });
              }
            });
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
    if (maintainSessionId) {
      sendLeave(maintainSessionId);
      if (mySession) {
        mySession.disconnect();
      }
      dispatch(authActions.endConsulting(false));
      dispatch(authActions.deleteMySessionId(""));
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
    dispatch(authActions.startConsulting(true));
    dispatch(authActions.getMySessionId(response.data.sessionId));
    return response.data.sessionId; // The sessionId
  };

  const consultantVideo = () => {
    return (
      <Fragment>
        {subscribers.map((sub, i) => (
          <div key={i} className="stream-container col-md-6 col-xs-6">
            <span>{sub.id}</span>
            <Video streamManager={sub} status={"user"} />
          </div>
        ))}
        {publisher !== undefined ? (
          <div className="stream-container col-md-6 col-xs-6">
            <Video streamManager={publisher} status={"consultant"} />
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
            <Video streamManager={publisher} status={"user"} />
          </div>
        ) : null}
        {subscribers.map((sub, i) => (
          <div key={i} className="stream-container col-md-6 col-xs-6">
            <span>{sub.id}</span>
            <Video streamManager={sub} status={"consultant"} />
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

  // 새로고침 시 axios 보내기
  const beforeUnLoad = (e) => {
    // e.preventDefault();
    e.stopPropagation();
    e.returnValue = "";
  };

  useEffect(() => {
    window.addEventListener("beforeunload", beforeUnLoad);
    leaveSession();

    return () => {
      window.removeEventListener("beforeunload", beforeUnLoad);
    };
  }, []);

  return (
    <Fragment>
      <div className={classes.div}>
        {session === undefined ? (
          <div className={classes.consultant}>
            <h2 className={classes.h2}>상담</h2>
            <div className={classes.wall}></div>
            <form
              className={classes.form}
              onSubmit={(event) => {
                event.preventDefault();
                joinSession(event);
                dispatch(authActions.startConsulting(true));
              }}
            >
              <div className={classes.state}>
                <p>지금 컨설팅을 시작해보세요</p>
                <p>Style With Us</p>

                <div className={classes.section}>
                  <input
                    className={classes["join-button"]}
                    name="commit"
                    type="submit"
                    value="방 생성하기"
                  />
                </div>
              </div>
            </form>
          </div>
        ) : null}

        {session !== undefined ? (
          <div className={classes["session-on"]} id="session">
            <div className={classes["button-section"]}>
              <button
                className={classes["back-button"]}
                onClick={pageBackHandler}
              >
                Back
              </button>
            </div>
            <div id="video-container" className="col-md-6">
              {userType === 0 ? userVideo() : consultantVideo()}
            </div>
          </div>
        ) : null}
      </div>
    </Fragment>
  );
};

export default Consultant;
