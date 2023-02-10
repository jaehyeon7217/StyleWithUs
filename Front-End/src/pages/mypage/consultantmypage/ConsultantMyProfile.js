import ConsultantMyPageSideBar from './ConsultantMyPageSideBar';
import classes from './ConsultantMyProfile.module.css'
import consultantWoman from '../../../assets/consultantwoman.png';
import consultantman from '../../../assets/consultantman.png';
import { useState } from "react";
import { useSelector } from "react-redux";

const ConsultantMyProfile = () => {
    const consultantId = useSelector((state) => state.auth.userId);
    const token = useSelector((state) => state.auth.token);
    const data = useSelector((state) => state.auth.userData);
    const review = useSelector((state) => state.auth.myReviewList);
    const reviewAvg = useSelector((state) => state.auth.reviewAvg);

    return(
        <div className={classes.ProfilePage}>
            <ConsultantMyPageSideBar />
            <div className={classes.ProfileMainBox}>
            <h3 className={classes.ProfileName}>프로필</h3>
            <hr className={classes.hr} />
            <div className={classes.ImgTextBox}>
                    <p >{(data.consultantGender ? <img src={consultantman} className={classes.consultantman} /> : <img src={consultantWoman} className={classes.consultantWoman} />)}</p>
                <div>
                    <p className={classes.consultantName}>{data.consultantName}</p>
                    <p className={classes.userType}>컨설턴트</p>
                </div>
            </div>
            <hr className={classes.hrgrey} />
            <div>
                <div>
                    <h3 className={classes.ProfileName}>경력 기술서</h3>
                        <p>{data.consultantResume}</p>
                </div>
                <div>
                    <h3 className={classes.ProfileName}>개인정보</h3>
                    <p>{data.consultantName}</p>
                    <p>{data.consultantNickname}</p>
                    <p>{data.consultantId}</p>
                    <p>{data.consultantEmail}</p>
                    <p>{data.consultantGender}</p>
                </div>
            </div>
            </div>

        </div>
    )
}

export default ConsultantMyProfile;