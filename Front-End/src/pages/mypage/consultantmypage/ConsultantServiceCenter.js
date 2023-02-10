import ConsultantMyPageSideBar from './ConsultantMyPageSideBar';
import ServiceCenterCopy from '../../servicecenter/ServiceCenterCopy'
import classes from './ConsultantServiceCenter.module.css'

const ConsultantServiceCenter = () => {
    return(
        <div className={classes.servicecenterbox}>
            <ConsultantMyPageSideBar />
            <ServiceCenterCopy />

        </div>
    )
}

export default ConsultantServiceCenter;