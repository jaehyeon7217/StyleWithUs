import classes from "./ChatContentItem.module.css";

const ChatContentItem = (props) => {
  const message = props.message;

  const mySelf = props.isMyself;

  return (
    <div className={classes["speech-bubble-box"]}>
      <div className={mySelf ? classes["div-right"] : classes["div-left"]}>
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
    </div>
  );
};

export default ChatContentItem;
