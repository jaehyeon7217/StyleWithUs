import classes from "./ChatContentItem.module.css";

const ChatContentItem = (props) => {
  const message = props.message;

  const mySelf = props.isMyself;

  return (
    <div className={`${classes["speech-bubble-box"]} chat-toggle-event`}>
      <div className={`${mySelf ? classes["div-right"] : classes["div-left"]} chat-toggle-event`}>
        <p
          className={`${mySelf ? classes.right : classes.left} ${
            classes["speech-bubble"]
          } chat-toggle-event`}
        >
          {message}
        </p>
        <span className={`${mySelf ? classes["span-right"] : classes["span-left"]} chat-toggle-event`}>
          {props.time}
        </span>
      </div>
    </div>
  );
};

export default ChatContentItem;
