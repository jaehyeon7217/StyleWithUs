import { useState } from 'react';
import classes from './ServiceCenterCopy.module.css';
import ServiceCenterSideBar from './ServiceCenterSideBar';
import Question from './Question';

const ServiceCenterCopy = () => {
    const [visible, setVisible] = useState(false);

    return (
        <div className={classes.MarginBox}>
            <div className={classes.WrapPage}>
                
                <div className={classes.ServiceCenterBox}>
                    <div>
                        <h3 className={classes.QuestionName}>자주 묻는 질문</h3>
                        <hr className={classes.hr} />
                    </div>
                    <Question
                        category="공통"
                        title="STYLE WITH US는 어떤 서비스인가요 "
                        contentHard="STYLE WITH US"
                        content2="패션 전문 컨설턴트와 사용자 매칭 및 부가 의류 추천 기능을 통해 사용자에게 적합한 의류를 추천해 주는 서비스입니다."
                        content1="사용자에게 적합한 의류를 추천해줌으로써 스타일 개선 및 패스트 패션으로 인한 환경 오염 문제를 해결할 수 있습니다."
                    />
                    <Question
                        category="공통"
                        title="고객센터 연락처를 알려주세요"
                        contentHard="고객센터 02-3429-5100 "
                        content1="서비스를 이용하며 느끼신 불편한 점이나 바라는 점을 알려주세요. 소중한 의견으로 더욱 성장하는 STYLE WITH US가 되겠습니다."
                        content2="운영시간 평일 11:00 - 18:00(토일, 공휴일 휴무)"
                    />
                    <div>
                        <div className={classes.QItem} onClick={() => { setVisible(!visible) }}>
                            <h3 className={classes.category}>공통</h3>
                            <h3 className={classes.Title}>컨설턴트 기준이 궁금해요</h3>
                            <div className={classes.crampsbtn}>
                                {visible ? <div className={classes.checkIconTwo}></div> : <div className={classes.checkIcon}></div>}
                            </div>
                        </div>
                        <hr className={classes.hrgrey} />
                        <div>
                            {visible && <div className={classes.Qdap}>
                                <div className={classes.TextBox}>
                                    <div><br /></div>
                                    <div className={classes.QdapHard}>컨설턴트 기준은 아래와 같습니다.</div>
                                    <br />
                                    <div className={classes.QdapLight}>- 4년제 대학을 졸업한 패션 디자인 전공자 </div>
                                    <div className={classes.QdapLight}>- 패션 및 디자인 관련 분야 5년 이상의 경력자</div>
                                    <div className={classes.QdapLight}>- 인스타 팔로워 50만 이상</div>
                                    <br />
                                    <div className={classes.QdapLight}>위 조건을 만족한 패션 전문가만이 STYLE WITH US의 컨설턴트가 될 수 있습니다.</div>
                                </div>
                            </div>}
                        </div>
                    </div>
                    <Question
                        category="이용정책"
                        title="로그인이 이상해요 / 회원가입이 이상해요"
                        contentHard="컨설턴트/사용자 로 로그인을 했는지 확인해주세요."
                        content1="로그인 진행시, 위 토글 버튼이 User/Consultant로 되어있는지 확인해 주세요."
                        content3="혹은 회원가입을 User/Consultant로 했는지 확인해 주세요."
                    />

                    <Question
                        category="이용정책"
                        title="부적절행위 절대 금지"
                        contentHard="부적절행위 신고 접수 시, "
                        content1="이용약관 제 21조에 따라 일시정지나 영구이용정지 조치됩니다."
                        content3="허위사실 유포 관련 고의성이 확인될 시, 유관부서로 이관되어 처리될 수 있습니다."
                    />
                    <Question
                        category="사회공헌"
                        title="패스트 패션으로 인한 환경 오염 해소에 동참하고 싶어요"
                        contentHard="STYLE WITH US 회원들은 모두 이미 환경 오염 해소에 동참하고 있습니다."
                        content2="STYLE WITH US를 통해 신중한 의류 선택을 하는 회원들은 이미 환경 오염에 동참하고 있습니다."
                        content1="추가로 기부를 희망하는 회원은"
                        content3="농협 352-1222-9987로 입금 바랍니다."
                    />
                </div>

            </div>
        </div>
    )

}

export default ServiceCenterCopy;