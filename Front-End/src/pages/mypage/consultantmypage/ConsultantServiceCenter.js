import { useEffect } from 'react';

import ConsultantMyPageSideBar from './ConsultantMyPageSideBar';
import ServiceCenterCopy from '../../servicecenter/ServiceCenterCopy'
import classes from './ConsultantServiceCenter.module.css'

const ConsultantServiceCenter = () => {

    useEffect(() => {
        document.querySelector(`#App`).scrollIntoView({behavior: "smooth", block: "start"});
      }, []);
    

    return(
        <div className={classes.servicecenterbox}>
            <ConsultantMyPageSideBar />
            <ServiceCenterCopy />

        </div>
    )
}

export default ConsultantServiceCenter;