import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Consultant.module.css";

import Video from "./video/Video";
import Shop from "./shop/Shop";
import Cart from "./cart/Cart";
import ChatContent from "./chat/ChatContent";
import ChatForm from "./chat/ChatForm";

const Consultant = () => {
  const [toggleChatToCart, setToggleChatToCart] = useState(false);
  const navigate = useNavigate();

  // 돌아가기 버튼 함수
  const pageBackHandler = () => {
    navigate(-1);
  };

  // 포커스 될 때 채팅창이 보이게 하는 함수
  const onFucusHandler = () => {
    setToggleChatToCart(true);
  };

  // 블러 될 때 카트가 보이게 하는 함수
  const onBlurHandler = () => {
    setToggleChatToCart(false);
  }

  return (
    <Fragment>
      <h1>Consultant</h1>
      <main className={classes.main}>
        <section className={classes.section}>
          <Video />
          <Video />
        </section>
        <section className={classes.section}>
          <Shop />
        </section>
        <section className={classes.section}>
          {!toggleChatToCart && <Cart />}
          {toggleChatToCart && <ChatContent />}
          <ChatForm onFocus={onFucusHandler} onBlur={onBlurHandler} />
        </section>
      </main>
      <button onClick={pageBackHandler}>Back</button>
    </Fragment>
  );
};

export default Consultant;
