import classes from "./ChatContent.module.css";

import ChatContentItem from "./ChatContentItem";

const ChatContent = (props) => {
  const cssClasses = classes['chat-content'] + ' ' + props.className

  const chattings = props.chatting;

  return (
    <div className={cssClasses}>
      <h5>chat-content</h5>
      {chattings.map((chatting, idx) => {
        return <ChatContentItem key={idx} message={chatting.data}/>
      })}
    </div>
  );
};

export default ChatContent;
