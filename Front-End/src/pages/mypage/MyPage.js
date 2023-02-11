import classes from './MyPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/auth';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import MyPageWish from './MyPageWish';
import MyPageSideBar from './MyPageSideBar';
import MyWishItemBig from './MyWishItemBig';
import userImg from "../../assets/userimg.png";
import { useEffect } from 'react';
import userMan from '../../assets/footermantwo.png';
import userWoman from '../../assets/mypageuserwoman.png';


const MyPage = () =>{
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token)
  const userId = useSelector((state) => state.auth.userId)
  const userData = useSelector((state) => state.auth.userData)
  const navigate = useNavigate();

  const cartItems = useSelector((state)=> state.cart.cartItems)

  const getMyData = () =>{
    const url = "https://i8d105.p.ssafy.io/be/user/get/" + userId
    axios.get(
      url,
      {
        headers:{
          Authorization : token
        }
      }
    ).then(response => {
      if (response.status===200){
        dispatch(authActions.getMyData(response.data.data))
      }else{
        window.alert("회원정보가 없습니다.")
      }
    }).catch(error =>{
      console.log(error);
    })    
  }
  useEffect(()=>{
    getMyData()
  }, [])
  // 비밀번호 변경 페이지 이동
  const SetNewPassword = (event) =>{
    event.preventDefault();
    navigate("/auth/passwordchange")
    
  }

  // 추천 페이지로 이동
  const SBTIPage = (event) => {
    event.preventDefault();
    navigate("/sbti")
  }

  // 관심 상품 페이지로 이동
  const MyPagewish = (event) => {
    event.preventDefault();
    navigate("/mypagewish")
  }

  // 프로필 정보 페이지로 이동
  const MyProfile = (event) => {
    event.preventDefault()
    navigate('/myprofile')
  }


  return(
    <div className={classes.MarginBox}>
      <div className={classes.WrapMyPage}>
          <MyPageSideBar/>
          <div className={classes.MainBox}>
            <div className={classes.MyInformBox}>
              <h3 className={classes.MainLabel}>회원 정보</h3>
              <div className={classes.MyInformBackground}>
                <div className={classes.MyInformUserCircle}>
                <p >{(userData.userGender ? <img src={userMan} className={classes.userImgetwo} /> : <img src={userWoman} className={classes.userImge} />)}</p>
                {/* <img src={userImg} alt="" className={classes.userImg}/> */}
                  </div>
                <div className={classes.MyInformLetter}>
                  <p className={classes.MyInformNickName}>{userData.userNickname}</p>
                  <p className={classes.MyInformNickNameHi}>님 안녕하세요,</p>
                </div>
                <div className={classes.MyInformLetterTwo}>
                  {/* <p className={classes.MyInformID}>{userData.userId}</p> */}
                  <p className={classes.MyInformEmail}>{userData.userEmail}</p>
                  <button className={classes.MyInformBtntwo} onClick={MyProfile}>프로필 정보</button>
                  <button className={classes.MyInformBtn} onClick={SetNewPassword}>비밀번호 수정</button>
                </div>
                <div className={classes.userTypeBox}>
                <p className={classes.userType}>회원유형</p>
                <div className={classes.vline}></div>
                <p className={classes.userTypeDap}>사용자</p>
                </div>
              </div>
              
              <div className={classes.MyBodyDataBox}>
              <p className={classes.StyleCheckBtn} onClick={SBTIPage}>다시 검사하기</p>
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
                      <p className={classes.MyBodyItemDap}>{userData.userShoulder}</p>
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
          <p className={classes.ViewMoreBtn} onClick={MyPagewish}>더보기</p>
              <h3 className={classes.MainLabel}>관심 상품</h3>
                <div className={classes.WarpAllItem}>
                {cartItems.map((item, idx) => {
                  return (
                    <div key={idx} className={classes.CartItemDiv}>
                      <MyWishItemBig
                        index={idx + 1}
                        title={item.title}
                        img={item.image}
                        price={item.price}
                        url={item.url}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
    </div>
    </div>
    
  )
}

export default MyPage