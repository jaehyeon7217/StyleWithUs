import { useState } from "react";
// css style
import classes from "./ChatForm.module.css";

const ChatForm = (props) => {
  const [message, setMessage] = useState("");

  const onSubmitHandler = (event) => {
    event.preventDefault();

    props.onMessageSend(message);
    setMessage("");
  };

  const onInputHandler = (event) => {
    setMessage(event.target.value);
  };

  return (
    <form className={classes["chat-form"]} onSubmit={onSubmitHandler}>
      <input
        type="text"
        id="chat-form-input"
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        onInput={onInputHandler}
        value={message}
        className={`${classes.input} chat-toggle-event`}
        placeholder="채팅창을 보고 싶으면 클릭해주세요."
      />
    </form>
  );
};

export default ChatForm;
