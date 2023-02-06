import { useState } from 'react';
import classes from './ServiceCenter.module.css';
import ServiceCenterSideBar from './ServiceCenterSideBar';
import Question from './Question';

const ServiceCenter = () => {
    const [visible, setVisible] = useState(false);

    return(
        <div className={classes.MarginBox}>
            <div className={classes.WrapPage}>
                <ServiceCenterSideBar/>
                <div>
                <div className={classes.ServiceCenterBox}>
                    <h3 className={classes.QuestionName}>자주 묻는 질문</h3>
                    <hr className={classes.hr} />
                </div>
                <Question
                    category="공통" 
                    title="STYLE WITH US는 어떤 서비스인가요 "
                    contentHard="STYLE WITH US는"
                    content2="컨설턴트와 사용자 매칭, 부가 의류 추천 기능을 통해 사용자에게 적합한 의류를 추천해 주는 서비스입니다."
                    content1="사용자에게 적합한 의류를 추천해줌으로써 스타일 개선 및 패스트 패션으로 인한 환경 오염을 해결할 수 있습니다."
                />
                <Question
                    category="공통"
                    title="고객센터 연락처를 알려주세요"
                    contentHard="고객센터 010-1234"
                    content1="서비스를 이용하며 느끼신 불편한 점이나 바라는 점을 알려주세요. 소중한 의견으로 더욱 성장하는 STYLE WITH US가 되겠습니다."
                    content2="운영시간 평일 11:00 - 18:00(토일, 공휴일 휴무)"
                />
                <Question
                    category="공통"
                    title="컨설턴트 기준이 궁금해요"
                    content2="컨설턴트는 패션 분야 5년 이상 경력자"
                />
                <Question
                    category="공통"
                    title="로그인이 이상해요"
                    content2="컨설턴트로 로그인을 했는지 확인해주세요."
                />
                <Question
                    category="이용정책"
                    title="부적절행위 금지"
                    content2="아래에 해당하는 경우, 이용약관 제 21조에 따라 일시정지나 영구이용정지 조치됩니다. 허위사실 유포 관련 고의성이 확인될 시, 유관부서로 이관되어 처리될 수 있습니다."
                />
                <Question
                    category="이용정책"
                    title="커뮤니티 가이드라인"
                    content2="STYLE WITH US내 STYLE 서비스는 회원들의"
                />
                </div>
                
            </div>
        </div>
    )
    
}

export default ServiceCenter;