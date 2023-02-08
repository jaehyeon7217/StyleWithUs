import classes from './DeveloperPage.module.css'
import diarytemp1 from "../../assets/diarytemp1.png"

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
                        <img src={diarytemp1} alt="" className={classes.diarytemp1}/>
                            <div className={classes.diaryboxtwo}>
                                <div className={classes.dateboxtwo}>
                                    <p className={classes.datetwo}>2023.02.08 ~ 2023.02.08</p>
                                    <p className={classes.dash}>-</p>
                                </div>
                                <p className={classes.datenametwo}>추천 페이지 완성</p>
                                <p className={classes.datacontenttwo}>설명 설명 설명 설명 설명 설명 설명 설명 </p>
                                <p className={classes.datacontenttwo}>설명 설명 설명 설명 설명 설명 설명 설명 </p>
                            </div>
                        <img src={diarytemp1} alt="" className={classes.diarytemp3} />
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
                                <p className={classes.dateone}>2023.02.08 ~ 2023.02.08</p>
                                </div>
                                <p className={classes.datenameone}>추천 페이지 완성</p>
                                <p className={classes.datacontent}>설명 설명 설명 설명 설명 설명 설명 설명 </p>
                                <p className={classes.datacontent}>설명 설명 설명 설명 설명 설명 설명 설명 </p>
                            </div>
                        <img src={diarytemp1} alt="" className={classes.diarytemp2} />
                            <div className={classes.diaryboxone}>
                                <div className={classes.dateboxone}>
                                    <p className={classes.dash}>-</p>
                                    <p className={classes.dateone}>2023.02.08 ~ 2023.02.08</p>
                                </div>
                                <p className={classes.datenameone}>추천 페이지 완성</p>
                                <p className={classes.datacontent}>설명 설명 설명 설명 설명 설명 설명 설명 </p>
                                <p className={classes.datacontent}>설명 설명 설명 설명 설명 설명 설명 설명 </p>
                            </div>
                        <img src={diarytemp1} alt="" className={classes.diarytemp4} />
                        </div>
                    </div>
                    <div className={classes.marginbox}></div>
                </div>
            </div>
        </div>
    )
}

export default DeveloperPage;