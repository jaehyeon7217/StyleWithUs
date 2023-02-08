import { OpenVidu } from "openvidu-browser";
import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useInterval from "./useInterval";
import axios from "axios";

import ConsultantList from "./ConsultantList";
import ConsultantReview from "./ConsultantReview";
import Video from "../Video";
import { chatActions } from "../../../../store/chat";
import Swal from "sweetalert2";

const APPLICATION_SERVER_URL =
  process.env.NODE_ENV === "production"
    ? ""
    : "https://i8d105.p.ssafy.io/be/openvidu/";

const Consultant = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // token
  const userToken = useSelector((state) => state.auth.token);

  // 유저 아이디
  const userType = useSelector((state) => state.auth.userType);
  const user = useSelector((state) => state.auth.userData);
  const nickname = userType === 1 ? user.consultantNickname : user.userNickname;

  // openvidu useState
  const [OV, setOV] = useState(<OpenVidu />);
  const [mySessionId, setMySessionId] = useState("");
  const [myUserName, setMyUserName] = useState(nickname);
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const [session, setSession] = useState(undefined);

  // 리뷰 페이지
  const [backIsClicked, setBackIsClicked] = useState(false);

  // 돌아가기 버튼 함수
  const pageBackHandler = () => {
    leaveSession();
    setBackIsClicked(true);
    //     const newLoadingStatus = true;
    //     props.onChangeLoading(newLoadingStatus);
    //     navigate(-1);
  };

  // openvidu 함수
  const handleChangeSessionId = (event) => {
    setMySessionId(event.target.value);
  };

  const handleChangeUserName = (event) => {
    setMyUserName(event.target.value);
  };

  const deleteSubscriber = (streamManager) => {
    const prevSubscribers = subscribers;
    let index = prevSubscribers.indexOf(streamManager, 0);
    if (index > -1) {
      prevSubscribers.splice(index, 1);
      setSubscribers([...prevSubscribers]);
    }
  };

  // sessionId 받아오기
  const addSessionIdHandler = (getSessionId) => {
    setMySessionId(getSessionId);
  };

  useEffect(() => {
    if (mySessionId !== "") {
      setBackIsClicked(false);
      joinSession();
    }
  }, [mySessionId]);

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
    const url =
      APPLICATION_SERVER_URL + "api/sessions/" + sessionId + "/disconnections";
    const data = {};
    const response = await axios.post(url, data, {
      headers: {
        Authorization: userToken,
      },
    });
    return response.data;
  };

  const getToken = async () => {
    // const sessionId = await createSession(mySessionId);
    return await createToken(mySessionId);
  };

  const createToken = async (mySessionId) => {
    const url =
      APPLICATION_SERVER_URL + "api/sessions/" + mySessionId + "/connections";
    const data = {};
    const response = await axios.post(url, data, {
      headers: {
        Authorization: userToken,
      },
    });
    // 이미 상담 중인 경우
    if (response.data.msg === 'The session room is full.') {
      Swal.fire({
        title: '<div style="font-size:24px;font-family:Apple_Gothic_Neo_Bold;font-weight:bold;">접속 실패!<div>', 
        html: '<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">이미 상담중인 방입니다</div>', 
        width : 330,
        icon: 'error',
        confirmButtonText:'<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">확인</div>',
        confirmButtonColor: '#9A9A9A',
      })
      console.log('이미 상담 중인 방입니다.')

      setOV(null);
      setSession(undefined);
      setSubscribers([]);
      setMySessionId("");
      setMyUserName(nickname);
      setMainStreamManager(undefined);
      setPublisher(undefined);
  
      dispatch(chatActions.leaveChatting())

      return;
    } else {
      // console.log(response.data.token);
      return response.data.token; // The token
    }
  };
  // 끝

  // 대기창 관련 작업
  const [sessionLists, setSessionLists] = useState([]);
  const [getSessionStatus, setGetSessionStatus] = useState(false);

  const getSession = async () => {
    setGetSessionStatus(true);
    const url = APPLICATION_SERVER_URL + "api/sessions";
    const response = await axios.get(url, {
      headers: {
        Authorization: userToken,
      },
    });
    // console.log(response.data.data);
    setSessionLists(response.data.data);
  };

  // 대기창 5초마다 실행
  useInterval(() => {
    if (getSessionStatus) {
      getSession();
    }
  }, 5000);

  // 세션 종료 후 대기창 원래 상태로
  useEffect(() => {
    setSessionLists([])
  }, [getSessionStatus])

  // 메세지를 보내기 위해서 세션을 올려보낸다.
  useEffect(() => {
    if (session !== undefined) {
      props.sessionSend(session);
    }
  }, [session]);

  // 리뷰 작성을 위한 consultantId 받아오기
  const [getConsultantId, setGetConsultantId] = useState(undefined);

  useEffect(() => {
    // console.log(getConsultantId);
  }, [getConsultantId]);

  return (
    <Fragment>
      <div>
        {session === undefined ? (
          <div>
            <div>현재 상담 가능한 컨설턴트 보기</div>
            <input type="button" onClick={getSession} value="클릭" />
            {sessionLists.map((list, idx) => {
              return (
                <ConsultantList
                  setGetSessionStatus={setGetSessionStatus}
                  setGetConsultantId={setGetConsultantId}
                  onAddSessionId={addSessionIdHandler}
                  key={idx}
                  consultantId={list.consultantId.consultantId}
                  consultantNickname={list.consultantId.consultantNickname}
                  consultantGender={list.consultantId.consultantGender}
                  consultantResume={list.consultantId.consultantResume}
                  numberOfPeople={!(list.numberOfPeople - 1)}
                  sessionId={list.sessionId}
                />
              );
            })}
          </div>
        ) : null}

        {session !== undefined ? (
          <div id="session">
            {mainStreamManager !== undefined ? (
              <div id="main-video" className="col-md-6">
                <Video streamManager={mainStreamManager} />
              </div>
            ) : null}
            <div id="video-container" className="col-md-6">
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
            </div>
            <button onClick={pageBackHandler}>Back</button>
          </div>
        ) : null}
        {backIsClicked && (
          <ConsultantReview
            setGetSessionStatus={setGetSessionStatus}
            getConsultantId={getConsultantId}
            setGetConsultantId={setGetConsultantId}
            setBackIsClicked={setBackIsClicked}
          />
        )}
      </div>
    </Fragment>
  );
};

export default Consultant;
