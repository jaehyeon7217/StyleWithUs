import classes from "./ChatForm.module.css";

const ChatForm = (props) => {
  return (
    <form className={classes["chat-form"]}>
      <input type="text" onFocus={props.onFocus} onBlur={props.onBlur} />
    </form>
  );
};

export default ChatForm;
