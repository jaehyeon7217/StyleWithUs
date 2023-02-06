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
                    content="답변"
                />
                <Question
                    category="공통"
                    title="고객센터 연락처를 알려주세요"
                    contentHard="고객센터 010-1234"
                    content1="서비스를 이용하며 느끼신 불편한 점이나 바라는 점을 알려주세요. 소중한 의견으로 더욱 성장하는 STYLE WITH US가 되겠습니다."
                    content2="- 운영시간 평일 11:00 - 18:00(토일, 공휴일 휴무)"
                />
                <Question
                    category="공통"
                    title="컨설턴트 기준이 궁금해요"
                    content="답변"
                />
                <Question
                    category="공통"
                    title="로그인이 이상해요"
                    content="답변"
                />
                <Question
                    category="이용정책"
                    title="부적절행위 금지"
                    content="답변"
                />
                <Question
                    category="이용정책"
                    title="커뮤니티 가이드라인"
                    content="답변"
                />
                </div>
                
            </div>
        </div>
    )
    
}

export default ServiceCenter;