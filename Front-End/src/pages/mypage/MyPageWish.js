import classes from './MyPageWish.module.css';
import MyPageSideBar from './MyPageSideBar';
import MyWishItem from './MyWishItem';
import { useDispatch, useSelector } from 'react-redux';
import {useState} from 'react'
import axios from 'axios';
import { cartActions } from '../../store/cart';
import { useEffect } from 'react';
import Pagination from "../consultant/component/Pagination";

const MyPageWish = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token)
    const userId = useSelector((state) => state.auth.userId)
    const cartItems = useSelector((state) => state.cart.cartItems);

    const [pagination, setPagination] = useState(1);
    const [divPagination, setDivPageNation] = useState(1);

    
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

    useEffect(() => {
        getMyWish();
    }, [])

    return(
        <div>
            <div className={classes.WrapMyPage}>
               <MyPageSideBar/>
               <div className={classes.WishBox}>
                <h3 className={classes.WishPageName}>관심 상품</h3>
                <hr className={classes.hr}/>
                <div className={classes.scroll}>
                    <ul className={classes.ul}>
                        {cartItems.map((item, idx) => {
                            return(
                                <li key={idx}>
                                    <MyWishItem
                                        index={item.itemNo}
                                        title={item.itemName}
                                        img={item.itemImgLink}
                                        price={item.itemPrice}
                                        url={item.itemUri}
                                    />
                                    
                                </li>
                            )
                        })}
                    </ul>
                </div>

               </div>
            </div>
            
        </div>
    )
}

export default MyPageWish;