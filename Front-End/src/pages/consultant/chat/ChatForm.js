import { useState } from "react";

import classes from "./ChatForm.module.css";

const ChatForm = (props) => {
  const [message, setMessage] = useState('');

  const onSubmitHandler = (event) => {
    event.preventDefault();

    props.onMessageSend(message);
    setMessage('');
  };

  const onInputHandler = (event) => {
    setMessage(event.target.value)
  }

  return (
    <form className={classes["chat-form"]} onSubmit={onSubmitHandler}>
      <input type="text" onFocus={props.onFocus} onBlur={props.onBlur} onInput={onInputHandler} value={message}/>
    </form>
  );
};

export default ChatForm;
