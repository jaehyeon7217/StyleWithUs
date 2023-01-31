import { useEffect } from "react";
import { useSelector } from "react-redux";
import classes from "./ChatContent.module.css";

import ChatContentItem from "./ChatContentItem";

const ChatContent = (props) => {
  const cssClasses = props.className + ' ' + classes['chat-content'] 

  const chattings = props.chatting;

  const user = useSelector((state) => state.auth.userData);
  const userType = useSelector((state) => state.auth.userType);

  let nickname = userType === 1 ? user.consultantNickname : user.userNickname;

  useEffect(() => {
    const chatWindow = document.getElementById("chat-window");
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }, [chattings]);

  return (
    <div className={`${cssClasses} chat-toggle-event`}>
      <h2 className={`${classes.h2} chat-toggle-event`}>채팅창</h2>
      <div className={`${classes.wall} chat-toggle-event`}></div>
      <div id="chat-window" className={`${classes.y} chat-toggle-event`}>
        <ul className={`${classes.ul} chat-toggle-event`}>
          {chattings.map((chatting, idx) => {
            return <ChatContentItem key={idx} message={chatting.data} isMyself={chatting.user === nickname ? true : false } time={chatting.time}/>
          })}
        </ul>
      </div>
    </div>
  );
};

export default ChatContent;
