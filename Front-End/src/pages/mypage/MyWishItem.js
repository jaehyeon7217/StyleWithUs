import axios from "axios";
import Swal from "sweetalert2";
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
          Swal.fire({
            position: 'bottom-end',
            html: '<div style="font-size:15px;font-family:Apple_Gothic_Neo_SB; display:flex;justify-content:center;align-items:center;line-height:18px; color: white;">장바구니에서 삭제되었습니다</div>',
            width: 230,
            showConfirmButton: false,
            timer: 1500,
            backdrop: 'transparent',
            background: '#f24141',
            padding: 10
          })
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
    </Fragment>
};

export default MyWishItem;