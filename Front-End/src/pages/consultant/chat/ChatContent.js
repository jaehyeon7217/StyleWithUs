import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// component
import ChatContentItem from "./ChatContentItem";
// css style
import classes from "./ChatContent.module.css";

const ChatContent = (props) => {
  useState();

  const cssClasses = props.className + " " + classes["chat-content"];

  const chattings = props.chattings;

  const user = useSelector((state) => state.auth.userData);
  const userType = useSelector((state) => state.auth.userType);

  let nickname = userType === 1 ? user.consultantNickname : user.userNickname;

  useEffect(() => {
    const chatWindow = document.getElementById("chat-window");
    chatWindow.scrollTop = chatWindow.scrollHeight;
    if (chattings.length !== 0) {
      const chatStatus = getComputedStyle(
        document.getElementById("chat-outer-window")
      ).zIndex;
      // 채팅창 상태 : auto(켜져있지 않을 때), 1(켜져있을 때)
      if (chatStatus === "auto") {
        const count = props.alarmCount + 1;
        props.alarm(count);
      }
    }
  }, [chattings]);

  return (
    <div id="chat-outer-window" className={`${cssClasses} chat-toggle-event`}>
      <h2 className={`${classes.h2} chat-toggle-event`}>채팅창</h2>
      <div className={`${classes.wall} chat-toggle-event`}></div>
      <div id="chat-window" className={`${classes.y} chat-toggle-event`}>
        <ul className={`${classes.ul} chat-toggle-event`}>
          {chattings.map((chatting, idx) => {
            return (
              <ChatContentItem
                key={idx}
                message={chatting.data}
                isMyself={chatting.user === nickname ? true : false}
                time={chatting.time}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ChatContent;
