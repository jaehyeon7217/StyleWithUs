import classes from "./ChatContentItem.module.css";

const ChatContentItem = (props) => {
  const message = props.message;

  const mySelf = props.isMyself;

  return (
    <div className={classes["speech-bubble-box"]}>
      <p
        className={`${mySelf ? classes.right : classes.left} ${
          classes["speech-bubble"]
        }`}
      >
        {message}
      </p>
      <span className={mySelf ? classes["span-right"] : classes["span-left"]}>
        {props.time}
      </span>
    </div>
  );
};

export default ChatContentItem;
