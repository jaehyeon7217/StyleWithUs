import { useState } from "react";
import classes from './Question.module.css';

const Question = (props) => {
    const [visible, setVisible] = useState(false);

    return(
        <div>
            <div className={classes.QItem} onClick={()=>{setVisible(!visible)}}>
                <h3 className={classes.category}>{props.category}</h3>
                <h3 className={classes.Title}>{props.title}</h3>
                <div>
                    {visible ? <div className={classes.checkIconTwo}></div>: <div className={classes.checkIcon}></div>}
                </div>
            </div>
            <hr className={classes.hrgrey}/>
            <div>
                {visible && <div className={classes.Qdap}>
                    <div className={classes.TextBox}>
                        <div><br/></div>
                        <div className={classes.QdapHard}>{props.contentHard}</div>
                        <div className={classes.QdapLight}>{props.content2}</div>
                        <div className={classes.QdapLight}>{props.content1}</div>
                    </div>
            </div>}
            </div>
            
        </div>
            
    )


}

export default Question;