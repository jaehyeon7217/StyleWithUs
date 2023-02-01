import { OpenVidu } from "openvidu-browser";
import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import classes from "./Consultant.module.css";
import { useSelector } from "react-redux";
import history from "./video/history";

import Video from "./video/Video";
import Shop from "./shop/Shop";
import Cart from "./cart/Cart";
import ChatContent from "./chat/ChatContent";
import ChatForm from "./chat/ChatForm";
import chatImage from "../../assets/chat.png";

const APPLICATION_SERVER_URL =
  process.env.NODE_ENV === "production"
    ? ""
    : "https://i8d105.p.ssafy.io/be/openvidu/";

const Consultant = (props) => {
  const [toggleChatToCart, setToggleChatToCart] = useState(false);
  const navigate = useNavigate();

  // 유저 아이디
  const userType = useSelector((state) => state.auth.userType);
  const user = useSelector((state) => state.auth.userData);
  const nickname = userType === 1 ? user.consultantNickname : user.userNickname;

  // openvidu useState
  const [OV, setOV] = useState(<OpenVidu />);
  const [mySessionId, setMySessionId] = useState("SessionA");
  const [myUserName, setMyUserName] = useState(nickname);
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const [session, setSession] = useState(undefined);

  // 채팅창 아이템들
  const [chatting, setChatting] = useState([]);

  // 알람창 카운트
  const [alarmCount, setAlarmCount] = useState(0);

  // 채팅창 focus blur 이벤트 작동 조건
  document.querySelector("body").addEventListener("click", function (event) {
    if (String(event.target.className).includes("chat-toggle-event")) {
      onFucusHandler();
    } else {
      onBlurHandler();
    }
  });

  // 뒤로가기 버튼을 누를 때 loading 상태 업데이트
  useEffect(() => {
    const listenBackEvent = () => {
      props.onChangeLoading(true);
    };

    const listenHistoryEvent = history.listen(({ action }) => {
      if (action === "POP") {
        listenBackEvent();
      }
    });

    return listenHistoryEvent;
  }, []);

  // 돌아가기 버튼 함수
  const pageBackHandler = () => {
    leaveSession();
    const newLoadingStatus = true;
    props.onChangeLoading(newLoadingStatus);
    navigate(-1);
  };

  // 포커스 될 때 채팅창이 보이게 하는 함수
  const onFucusHandler = () => {
    setAlarmCount(0);
    setToggleChatToCart(true);
  };

  // 블러 될 때 카트가 보이게 하는 함수
  const onBlurHandler = () => {
    setToggleChatToCart(false);
  };

  // 챗 알람
  const chattingAlarm = (count) => {
    setAlarmCount(count);
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

          setChatting((prevState) => {
            return [
              ...prevState,
              { user: userName, data: event.data, time: time },
            ];
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

    if (mySession) {
      mySession.disconnect();
    }

    // Empty all properties...
    setOV(null);
    setSession(undefined);
    setSubscribers([]);
    setMySessionId("SessionA");
    setMyUserName(nickname);
    setMainStreamManager(undefined);
    setPublisher(undefined);
  };

  const getToken = async () => {
    const sessionId = await createSession(mySessionId);
    return await createToken(sessionId);
  };

  const createSession = async (sessionId) => {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions",
      { customSessionId: sessionId },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data; // The sessionId
  };

  const createToken = async (sessionId) => {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions/" + sessionId + "/connections",
      {},
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data; // The token
  };

  // 끝

  // 메세지 Event
  const messageSendHandler = (data) => {
    session
      .signal({
        data: data, // Any string (optional)
        to: [], // Array of Connection objects (optional. Broadcast to everyone if empty)
        type: "my-chat", // The type of message (optional)
      })
      .then(() => {
        // console.log("Message successfully sent");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Fragment>
      <main className={classes.main}>
        <section className="container">
          {session === undefined ? (
            <div id="join">
              <div id="join-dialog" className="jumbotron vertical-center">
                <h1> Join a video session </h1>
                <form className="form-group" onSubmit={joinSession}>
                  <p>
                    <label>Participant: </label>
                    <input
                      className="form-control"
                      type="text"
                      id="userName"
                      value={myUserName}
                      onChange={handleChangeUserName}
                      required
                    />
                  </p>
                  <p>
                    <label> Session: </label>
                    <input
                      className="form-control"
                      type="text"
                      id="sessionId"
                      value={mySessionId}
                      onChange={handleChangeSessionId}
                      required
                    />
                  </p>
                  <p className="text-center">
                    <input
                      className="btn btn-lg btn-success"
                      name="commit"
                      type="submit"
                      value="JOIN"
                    />
                  </p>
                </form>
              </div>
            </div>
          ) : null}

          {session !== undefined ? (
            <div id="session">
              {/* <div id="session-header">
                <input
                  className="btn btn-large btn-danger"
                  type="button"
                  id="buttonLeaveSession"
                  onClick={leaveSession}
                  value="Leave session"
                />
              </div> */}

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
            </div>
          ) : null}
        </section>
        <section className={classes.section}>
          <Shop />
        </section>
        <section className={classes.section}>
          <div className={classes["show-cart-chat"]}>
            <Cart
              className={
                !toggleChatToCart
                  ? classes["toggle-animation-on"]
                  : classes["toggle-animation-off"]
              }
            />
            <ChatContent
              className={
                toggleChatToCart
                  ? classes["toggle-animation-on"]
                  : classes["toggle-animation-off"]
              }
              chatting={chatting}
              alarm={chattingAlarm}
              alarmCount={alarmCount}
            />
          </div>
          <ChatForm onMessageSend={messageSendHandler} />
          <div className={`${classes.alarm} ${alarmCount > 0? classes['alarm-on'] : ''}`}>
            <span>{alarmCount}</span>
            <img src={chatImage} alt="chat" />
          </div>
        </section>
      </main>
      <button onClick={pageBackHandler}>Back</button>
    </Fragment>
  );
};

export default Consultant;
