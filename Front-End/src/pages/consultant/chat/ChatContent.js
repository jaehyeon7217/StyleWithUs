import classes from "./ChatContent.module.css";

import ChatContentItem from "./ChatContentItem";

const ChatContent = () => {
  return (
    <div className={classes["chat-content"]}>
      <p>chat-content</p>
      <ChatContentItem />
      <ChatContentItem />
      <ChatContentItem />
      <ChatContentItem />
    </div>
  );
};

export default ChatContent;
