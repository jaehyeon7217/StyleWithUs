import classes from './ModalBasic.module.css'

const ModalBasic = ({setModalOpen, id, title, content, writer}) => {
    // 모달 끄기
    const closeModal = () => {
        setModalOpen(false);
    };

    return(
        <div className={classes.modalBackground}>
            <div className={classes.container}>
                <button className={classes.close} onClick={closeModal}>
                    x
                </button>
                <p>자기소개서</p>
            </div>
        </div>

    );
}

export default ModalBasic;