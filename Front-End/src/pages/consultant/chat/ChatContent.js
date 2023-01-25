import classes from "./ChatContent.module.css";

import ChatContentItem from "./ChatContentItem";

const ChatContent = (props) => {
  const cssClasses = classes['chat-content'] + ' ' + props.className

  return (
    <div className={cssClasses}>
      <p>chat-content</p>
      <ChatContentItem />
      <ChatContentItem />
      <ChatContentItem />
      <ChatContentItem />
    </div>
  );
};

export default ChatContent;
