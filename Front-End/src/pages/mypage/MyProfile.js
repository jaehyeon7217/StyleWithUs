import classes from './MyProfile.module.css';
import MyPageSideBar from './MyPageSideBar';
import { useSelector } from 'react-redux';
import userImage from "../../assets/mypageuser.png";
import userMan from '../../assets/footermantwo.png';
import userWoman from '../../assets/footerwoman.png';

const MyProfile = () => {
    const userData = useSelector((state) => state.auth.userData)

    return(
        <div className={classes.MarginBox}>
            <div className={classes.WrapMyPage}>
            <MyPageSideBar />
            <div className={classes.ProfileBox}>
                <h3 className={classes.ProfileName}>프로필</h3>
                <hr className={classes.hr} />
                <div className={classes.ProfileImgBox}>
                        <p >{(userData.userGender ? <img src={userMan} className={classes.userImgetwo} /> : <img src={userWoman} className={classes.userImge} />)}</p>
                    {/* <img src={userImage} alt="user" className={classes.userImg}/> */}
                    <div className={classes.ProfileImgLetter}>
                        <p className={classes.ImgName}>{userData.userName}</p>
                        <p className={classes.ImgUserType}>일반 유저</p>
                    </div>
                </div>
                    <hr className={classes.hrlong}/>
                <div className={classes.PersonalInform}>
                    <h3 className={classes.PersonalLabel}>개인 정보</h3>
                    <p className={classes.PersonalSmallLabel}>이름</p>
                    <p className={classes.userData}>{userData.userName}</p>
                    <div className={classes.BottomShort}></div>
                    <p className={classes.PersonalSmallLabel}>닉네임</p>
                    <p className={classes.userData}>{userData.userNickname}</p>
                    <div className={classes.BottomShort}></div>
                    <p className={classes.PersonalSmallLabel}>아이디</p>
                    <p className={classes.userData}>{userData.userId}</p>
                    <div className={classes.BottomShort}></div>
                    <p className={classes.PersonalSmallLabel}>이메일</p>
                    <p className={classes.userData}>{userData.userEmail}</p>
                    <div className={classes.BottomShort}></div>
                    <p className={classes.PersonalSmallLabel}>성별</p>
                    <p className={classes.userData}>{(userData.userGender ? "남" : "여")}</p>
                    <div className={classes.BottomShort}></div>
                    <br /><br />
                </div>

            </div>
        </div>
        </div>
        
    )
}

export default MyProfile;