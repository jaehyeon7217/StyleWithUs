import { Fragment } from "react";

import classes from "./MyWishItem.module.css";

const MyWishItem = (props) => {
    return <Fragment>
        <a href={props.url} className={classes.a} target="_blank">
            <div>
                <img src={props.img} alt={`${props.title}_img`} className={classes.img} />
                <span>{props.title}</span>
            </div>
            <span>{props.price}</span>
        </a>
        <span className={classes.DelBtn}>삭제</span>
        <hr className={classes.hr}/>
    </Fragment>
};

export default MyWishItem;