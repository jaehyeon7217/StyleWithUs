const ChatContentItem = (props) => {
  const message = props.message;

  return <h5>
    {message}
  </h5>
};

export default ChatContentItem;