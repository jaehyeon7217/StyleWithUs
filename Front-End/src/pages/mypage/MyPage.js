import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";
import { cartActions } from "../../store/cart";
import axios from "axios";
import Swal from "sweetalert2";
// component
import MyPageSideBar from "./MyPageSideBar";
import MyWishItemBig from "./MyWishItemBig";
// img
import userMan from "../../assets/footermantwo.png";
import userWoman from "../../assets/mypageuserwoman.png";
// css style
import classes from "./MyPage.module.css";

const MyPage = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.cartItems);
  // console.log(cartItems)
  const getMyData = () => {
    const url = "https://i8d105.p.ssafy.io/be/user/get/" + userId;
    axios
      .get(url, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          dispatch(authActions.getMyData(response.data.data));
        } else {
          window.alert("회원정보가 없습니다.");
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          Swal.fire({
            title:
              '<div style="font-size:24px;font-family:Apple_Gothic_Neo_Bold;font-weight:bold;">토큰 만료<div>',
            html: '<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">다시 로그인 해주세요!</div>',
            width: 330,
            icon: "error",
            confirmButtonText:
              '<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">확인</div>',
            confirmButtonColor: "#9A9A9A",
          }).then(() => {
            navigate("/");
            dispatch(authActions.logout(""));
          });
        }
      });
  };
  const getMyWish = () => {
    const url = "https://i8d105.p.ssafy.io/be/item/show/" + userId;
    axios
      .get(url, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        dispatch(cartActions.getCart(response.data.data));
      })
      .catch((error) => {
        if (error.response.status === 401) {
          Swal.fire({
            title:
              '<div style="font-size:24px;font-family:Apple_Gothic_Neo_Bold;font-weight:bold;">토큰 만료<div>',
            html: '<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">다시 로그인 해주세요!</div>',
            width: 330,
            icon: "error",
            confirmButtonText:
              '<div style="font-size:16px;font-family:Apple_Gothic_Neo_Mid;">확인</div>',
            confirmButtonColor: "#9A9A9A",
          }).then(() => {
            navigate("/");
            dispatch(authActions.logout(""));
          });
        }
      });
  };
  // 비밀번호 변경 페이지 이동
  const SetNewPassword = (event) => {
    event.preventDefault();
    navigate("/passwordchange");
  };
  
  // 추천 페이지로 이동
  const SBTIPage = (event) => {
    event.preventDefault();
    navigate("/sbti");
  };
  
  // 관심 상품 페이지로 이동
  const MyPagewish = (event) => {
    event.preventDefault();
    navigate("/mypagewish");
  };
  
  // 프로필 정보 페이지로 이동
  const MyProfile = (event) => {
    event.preventDefault();
    navigate("/myprofile");
  };

  useEffect(() => {
    getMyData();
    getMyWish();
  });
  
  useEffect(() => {
    document
    .querySelector(`#App`)
      .scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className={classes.MarginBox}>
      <div className={classes.WrapMyPage}>
        <MyPageSideBar />
        <div className={classes.MainBox}>
          <div className={classes.MyInformBox}>
            <h3 className={classes.MainLabel}>회원 정보</h3>
            <div className={classes.MyInformBackground}>
              <div className={classes.MyInformUserCircle}>
                <p>
                  {userData.userGender ? (
                    <img src={userMan} className={classes.userImgetwo} alt="userMan" />
                  ) : (
                    <img src={userWoman} className={classes.userImge} alt="userWoman"/>
                  )}
                </p>
              </div>
              <div className={classes.MyInformLetter}>
                <p className={classes.MyInformNickName}>
                  {userData.userNickname}
                </p>
                <p className={classes.MyInformNickNameHi}>님 안녕하세요,</p>
              </div>
              <div className={classes.MyInformLetterTwo}>
                {/* <p className={classes.MyInformID}>{userData.userId}</p> */}
                <p className={classes.MyInformEmail}>{userData.userEmail}</p>
                <button className={classes.MyInformBtn} onClick={MyProfile}>
                  프로필 정보
                </button>
                <button
                  className={classes.MyInformBtn}
                  onClick={SetNewPassword}
                >
                  비밀번호 수정
                </button>
              </div>
              <div className={classes.userTypeBox}>
                <p className={classes.userType}>회원유형</p>
                <div className={classes.vline}></div>
                <p className={classes.userTypeDap}>사용자</p>
              </div>
            </div>

            <div className={classes.MyBodyDataBox}>
              <p className={classes.StyleCheckBtn} onClick={SBTIPage}>
                다시 검사하기
              </p>
              <h3 className={classes.MainLabel}>나의 스타일</h3>
              <div className={classes.MyBodyBackground}>
                <div className={classes.MyBodyItemBox}>
                  <p className={classes.MyBodyLabel}>상체</p>
                </div>
                <div className={classes.vLine}></div>
                <div className={classes.MyBodyItemBox}>
                  <p className={classes.MyBodyItemLabel}>키</p>
                  <p className={classes.MyBodyItemDap}>{userData.userHeight}</p>
                </div>
                <div className={classes.MyBodyItemBox}>
                  <p className={classes.MyBodyItemLabel}>어깨너비</p>
                  <p className={classes.MyBodyItemDap}>
                    {userData.userShoulder}
                  </p>
                </div>
                <div className={classes.MyBodyItemBox}>
                  <p className={classes.MyBodyItemLabel}>가슴단면</p>
                  <p className={classes.MyBodyItemDap}>{userData.userChest}</p>
                </div>
                <div className={classes.MyBodyItemBox}>
                  <p className={classes.MyBodyItemLabel}>소매길이</p>
                  <p className={classes.MyBodyItemDap}>{userData.userSleeve}</p>
                </div>
              </div>
              <div className={classes.MyBodyBackground}>
                <div className={classes.MyBodyItemBox}>
                  <p className={classes.MyBodyLabel}>하체</p>
                </div>
                <div className={classes.vLine}></div>
                <div className={classes.MyBodyItemBox}>
                  <p className={classes.MyBodyItemLabel}>허리</p>
                  <p className={classes.MyBodyItemDap}>{userData.userWaist}</p>
                </div>
                <div className={classes.MyBodyItemBox}>
                  <p className={classes.MyBodyItemLabel}>엉덩이</p>
                  <p className={classes.MyBodyItemDap}>{userData.userHip}</p>
                </div>
                <div className={classes.MyBodyItemBox}>
                  <p className={classes.MyBodyItemLabel}>허벅지</p>
                  <p className={classes.MyBodyItemDap}>{userData.userThigh}</p>
                </div>
                <div className={classes.MyBodyItemBox}>
                  <p className={classes.MyBodyItemLabel}>밑단</p>
                  <p className={classes.MyBodyItemDap}>{userData.userHem}</p>
                </div>
                <div className={classes.MyBodyItemBox}>
                  <p className={classes.MyBodyItemLabel}>발사이즈</p>
                  <p className={classes.MyBodyItemDap}>{userData.userFoot}</p>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.WishItemBox}>
            <p className={classes.ViewMoreBtn} onClick={MyPagewish}>
              더보기
            </p>
            <h3 className={classes.MainLabel}>관심 상품</h3>
            <div className={classes.WarpAllItem}>
              {cartItems.slice(0, 4).map((item, idx) => {
                return (
                  <div key={idx} className={classes.CartItemDiv}>
                    <MyWishItemBig
                      index={idx + 1}
                      title={item.itemName}
                      img={item.itemImgLink}
                      price={item.itemPrice}
                      url={item.itemUri}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
