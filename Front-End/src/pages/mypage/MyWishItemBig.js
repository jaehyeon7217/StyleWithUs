import { Fragment } from "react";

import classes from './MyWishItemBig.module.css';

const MyWishItemBig = (props) => {
    return <Fragment>
        <div className={classes.ItemBox}>
            <a href={props.url} className={classes.a} target="_blank">
                <img src={props.img} alt={`${props.title}_img`} className={classes.img} />
            </a>
            <span className={classes.title}>{props.title}</span>
            <span className={classes.price}>{props.price}</span>
        </div>
    </Fragment>
};

export default MyWishItemBig;
