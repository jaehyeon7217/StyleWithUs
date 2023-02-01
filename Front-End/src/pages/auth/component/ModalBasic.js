import classes from './ModalBasic.module.css'

const ModalBasic = ({setModalOpen, id, title, content, writer}) => {
    // 모달 끄기
    const closeModal = () => {
        setModalOpen(false);
    };

    return(
        <div className={classes.modalBackground} onClick={closeModal}>
            <div className={classes.container}>
                <p className={classes.ModalName}>자기소개서</p>
                <div className={classes.InnerModalBox}></div>
                <p className={classes.ModalBottomName}>경력기술서 저장하기</p>
            </div>
        </div>

    );
}

export default ModalBasic;