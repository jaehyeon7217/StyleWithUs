import { useEffect } from "react";
import { useSelector } from "react-redux";
import classes from "./ChatContent.module.css";

import ChatContentItem from "./ChatContentItem";

const ChatContent = (props) => {
  const cssClasses = props.className + ' ' + classes['chat-content'] 

  const chattings = props.chatting;

  const user = useSelector((state) => state.auth.userData);

  useEffect(() => {
    const chatWindow = document.getElementById("chat-window");
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }, [chattings]);

  return (
    <div className={cssClasses}>
      <h2 className={classes.h2}>채팅창</h2>
      <div className={classes.wall}></div>
      <div id="chat-window" className={classes.y}>
        <ul className={classes.ul}>
          {chattings.map((chatting, idx) => {
            return <ChatContentItem key={idx} message={chatting.data} isMyself={chatting.user === user.userNickname ? true : false } time={chatting.time}/>
          })}
        </ul>
      </div>
    </div>
  );
};

export default ChatContent;
