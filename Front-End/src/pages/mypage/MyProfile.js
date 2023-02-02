import classes from './MyProfile.module.css';
import MyPageSideBar from './MyPageSideBar';

const MyProfile = () => {
    return(
        <div className={classes.WrapMyPage}>
            <MyPageSideBar />
            <div className={classes.ProfileBox}>
                <h3 className={classes.ProfileName}>프로필</h3>
                <hr className={classes.hr} />
                <div className={classes.ProfileImg}>
                    이미지 이름 일반 유저
                    <hr className={classes.hrlong}/>
                </div>
                <div className={classes.PersonalInform}>
                    <h3 className={classes.PersonalLabel}>개인 정보</h3>
                    <p className={classes.PersonalSmallLabel}>이름</p>
                    <div className={classes.BottomShort}></div>
                    <p className={classes.PersonalSmallLabel}>닉네임</p>
                    <div className={classes.BottomShort}></div>
                    <p className={classes.PersonalSmallLabel}>아이디</p>
                    <div className={classes.BottomShort}></div>
                    <p className={classes.PersonalSmallLabel}>이메일</p>
                    <div className={classes.BottomShort}></div>
                    <p className={classes.PersonalSmallLabel}>성별</p>
                    <div className={classes.BottomShort}></div>
                    <p className={classes.PersonalSmallLabel}>나이</p>
                    <div className={classes.BottomShort}></div>
                    <p className={classes.PersonalSmallLabel}>가입시간</p>
                    <div className={classes.BottomShort}></div>
                </div>

            </div>
        </div>
    )
}

export default MyProfile;