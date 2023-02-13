import classes from './Footer.module.css';
import { useNavigate } from "react-router-dom";

//이미지
import footerImge from "../../assets/footerman.png";
import footerImgetwo from "../../assets/footermantwo.png";
import tmpImg from "../../assets/tempImg.png";
import footerwoman from "../../assets/footerwoman.png"

const Footer = () => {
    const navigate = useNavigate();

    // 고객센터 페이지로 이동
    const RecommendPage = (event) => {
        event.preventDefault()
        navigate('/servicecentercopy')
    }

    // 개발팀 페이지 이동
    const toDeveloperpage = (event) => {
        event.preventDefault();
        navigate("/developerpage")
    }

    // 메인페이지 이동
    const toMainPage = (event) => {
        event.preventDefault();
        navigate("/mainpage")
    }

    return(
        <footer className={classes.footer}>
            <div className={classes.footerTop}>
                <div className={classes.footerTopOne}>
                    <div>
                        <p className={classes.fottername}>SERVICE GUIDE</p>
                        <p className={classes.fottercontent}>STYLE WITH US는 처음이지?</p>
                        <p className={classes.fottercontent}>서비스 소개를 확인해보세요.</p>
                        <button className={classes.fotterBtn} onClick={toMainPage}>서비스 안내</button>
                    </div>
                    <div>

                        <img src={footerImgetwo} alt="유저" className={classes.footerImgatwo} />
                        <img src={footerwoman} alt="" className={classes.footerwoman} />
                    </div>
                </div>
                <div className={classes.fotterToptwo}>
                    <div>
                        <p className={classes.fottername}>DEVELOPER GUIDE</p>
                        <p className={classes.fottercontent}>개발팀 소개는 처음이지?</p>
                        <p className={classes.fottercontent}>STYLE WITH US의 개발 일기를 확인해보세요.</p>
                        <button className={classes.fotterBtntwo} onClick={toDeveloperpage}>개발팀</button>
                    </div>
                    <div>
                    </div>
                    <img src={footerImge} alt="개발팀" className={classes.footerImge} />
                    <img src={tmpImg} alt="" className={classes.tmpImg} />
                </div>
            </div>
            <div className={classes.footerBottom}>
                <div className={classes.footerBoxone}>
                    <div className={classes.footerBoxOneTitle}>
                        <p className={classes.oneBoxP}>서비스 안내</p>
                        <p className={classes.oneBoxP}>서비스 사용방법</p>
                        <p className={classes.oneBoxP}>개발팀 소개</p>
                    </div>
                    <div>
                        <h3 className={classes.StylewithUsName}>(주) 스타일 윗 어스</h3>
                        <p className={classes.ContentOne}>
                            <div className={classes.ContentOneTitle}>대표 </div>
                            <div className={classes.ContentOneContent}>박재현 박성환 이병수 이동엽 김현진 양서정</div>
                        </p>
                        <p className={classes.ContentOne}>
                            <div className={classes.ContentOneTitle}>사업 분류 </div>
                            <div className={classes.ContentOneContent}>화상회의 기반 스타일 추천 웹사이트</div>
                        </p>
                        <p className={classes.ContentOne}>
                            <div className={classes.ContentOneTitle}>사업장 위치 </div>
                            <div className={classes.ContentOneContent}>삼성전자 구미 2사업장 후문 3층 D105</div>
                        </p>
                    </div>
                </div>
                <div className={classes.footerBoxtwo}>
                    <div>
                        <h3 className={classes.servicecentername}>고객센터 02-3429-5100</h3>
                        <p className={classes.ContentOne}>
                            <div className={classes.ContentOneTitle}>이메일 문의 </div>
                            <div className={classes.ContentOneContent}>ssafy@ssafy.com</div>
                        </p>
                        <p className={classes.ContentOne}>
                            <div className={classes.ContentOneTitle}>운영시간 </div>
                            <div className={classes.ContentOneContent}>AM 10:00 - PM 18:00</div>
                        </p>
                        <p className={classes.ContentOne}>
                            <div className={classes.ContentOneTitle}>점심시간 </div>
                            <div className={classes.ContentOneContent}>AM 11:30 - AM 12:30</div>
                        </p>
                        <button onClick={RecommendPage} className={classes.QuestionBtn}>자주 묻는 질문</button>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;