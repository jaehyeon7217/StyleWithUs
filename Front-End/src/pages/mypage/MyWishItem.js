import axios from "axios";
import { Fragment } from "react";
import classes from "./MyWishItem.module.css";
import { cartActions } from '../../store/cart';
import { useDispatch, useSelector } from 'react-redux';

const MyWishItem = (props) => {
    const dispatch = useDispatch();
    const userId = useSelector((state)=>state.auth.userId)
    const token = useSelector((state)=>state.auth.token)
    const itemNo = props.index

    const getMyWish = () => {
        const url = "https://i8d105.p.ssafy.io/be/item/show/" + userId;
        axios.get(
            url,
            {
                headers: {
                    Authorization: token
                }
            }
        ).then((response) => {
            dispatch(cartActions.getCart(response.data.data))
        })
    }


    const deleteItem = (event) => {
        event.preventDefault();
        const url = "https://i8d105.p.ssafy.io/be/item/delete/" + itemNo;
        axios.delete(
            url,
            {
                headers: {
                    Authorization: token
                }
            }
        ).then(() => {
            getMyWish();
        }
        ).catch(error => {
            console.log(error);
        })
    }


    return <Fragment>
        <a href={props.url} className={classes.a} target="_blank">
            <div>
                <img src={props.img} alt={`${props.title}_img`} className={classes.img} />
                <span>{props.title}</span>
            </div>
            <span>{props.price}</span>
        </a>
        <button className={classes.DelBtn} onClick={deleteItem}>삭제</button>
        <hr className={classes.hr}/>
    </Fragment>
};

export default MyWishItem;