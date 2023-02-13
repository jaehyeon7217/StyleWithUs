import classes from './DeveloperPage.module.css'
import diarytemp1 from "../../assets/diarytemp1.png"
import woman from '../../assets/consultantwoman.png'
import woman2 from '../../assets/mypageuserwoman.png'
import man from '../../assets/footerman.png'
import man2 from '../../assets/consultantman.png'
import man3 from '../../assets/mainPage/퍼스널컬러자가진단맨상체.png'
import man4 from '../../assets/mainPage/퍼스널컬러자가진단맨2상체.png'


const DeveloperPage = () => {
    return(
        <div>
            <div className={classes.pagebox}>
                <div className={classes.page}>
                    <div>
                        <p className={classes.smallName}>STYLE WITH US DIARY</p>
                        <h1 className={classes.bigNamd}>개발 일기</h1>
                    </div>
                    <div className={classes.contetnbox}>
                        <div>
                        <img src={man} alt="" className={classes.man}/>
                            <div className={classes.diaryboxtwo}>
                                <div className={classes.dateboxtwo}>
                                    <p className={classes.datetwo}>역할</p>
                                    <p className={classes.dash}>-</p>
                                </div>
                                <p className={classes.datenametwo}>이름</p>
                                <p className={classes.datacontenttwo}>느낀점느낀점느낀점느낀점느낀점느낀점 </p>
                                <p className={classes.datacontenttwo}>느낀점느낀점느낀점느낀점느낀점느낀점 </p>
                            </div>
                        <img src={man3} alt="" className={classes.man3} />
                            <div className={classes.diaryboxtwo}>
                                <div className={classes.dateboxtwo}>
                                    <p className={classes.datetwo}>2023.02.08 ~ 2023.02.08</p>
                                    <p className={classes.dash}>-</p>
                                </div>
                                <p className={classes.datenametwo}>추천 페이지 완성</p>
                                <p className={classes.datacontenttwo}>설명 설명 설명 설명 설명 설명 설명 설명 </p>
                                <p className={classes.datacontenttwo}>설명 설명 설명 설명 설명 설명 설명 설명 </p>
                            </div>
                            <img src={woman} alt="" className={classes.woman} />
                            <div className={classes.diaryboxtwo}>
                                <div className={classes.dateboxtwo}>
                                    <p className={classes.datetwo}>2023.02.08 ~ 2023.02.08</p>
                                    <p className={classes.dash}>-</p>
                                </div>
                                <p className={classes.datenametwo}>추천 페이지 완성</p>
                                <p className={classes.datacontenttwo}>설명 설명 설명 설명 설명 설명 설명 설명 </p>
                                <p className={classes.datacontenttwo}>설명 설명 설명 설명 설명 설명 설명 설명 </p>
                            </div>
                            
                        </div>
                        <div className={classes.vLine}></div>
                        <div>
                            <div className={classes.diaryboxone}>
                                <div className={classes.dateboxone}>
                                <p className={classes.dash}>-</p>
                                <p className={classes.dateone}>역할</p>
                                </div>
                                <p className={classes.datenameone}>이름</p>
                                <p className={classes.datacontent}>느낀점느낀점느낀점느낀점느낀점 </p>
                                <p className={classes.datacontent}>느낀점느낀점느낀점느낀점느낀점 </p>
                            </div>
                        <img src={man2} alt="" className={classes.man2} />
                            <div className={classes.diaryboxone}>
                                <div className={classes.dateboxone}>
                                    <p className={classes.dash}>-</p>
                                    <p className={classes.dateone}>역할</p>
                                </div>
                                <p className={classes.datenameone}>이름</p>
                                <p className={classes.datacontent}>느낀점느낀점느낀점느낀점느낀점 </p>
                                <p className={classes.datacontent}>느낀점느낀점느낀점느낀점느낀점 </p>
                            </div>
                        <img src={man4} alt="" className={classes.man4} />
                        <div className={classes.diaryboxone}>
                                <div className={classes.dateboxone}>
                                    <p className={classes.dash}>-</p>
                                    <p className={classes.dateone}>2023.02.08 ~ 2023.02.08</p>
                                </div>
                                <p className={classes.datenameone}>추천 페이지 완성</p>
                                <p className={classes.datacontent}>설명 설명 설명 설명 설명 설명 설명 설명 </p>
                                <p className={classes.datacontent}>설명 설명 설명 설명 설명 설명 설명 설명 </p>
                            </div>
                        <img src={woman2} alt="" className={classes.woman2} />
                        </div>
                    </div>
                    <div className={classes.marginbox}></div>
                </div>
            </div>
        </div>
    )
}

export default DeveloperPage;