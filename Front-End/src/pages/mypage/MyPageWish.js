import classes from './MyPageWish.module.css';
import MyPageSideBar from './MyPageSideBar';
import MyWishItem from './MyWishItem';
import { useSelector } from 'react-redux';


const MyPageWish = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);

    return(
        <div>
            <div className={classes.WrapMyPage}>
               <MyPageSideBar/>
               <div className={classes.WishBox}>
                <h3 className={classes.WishPageName}>관심 상품</h3>
                <hr className={classes.hr}/>
                <ul className={classes.ul}>
                    {cartItems.map((item, idx) => {
                        return(
                            <li key={idx}>
                                <MyWishItem
                                    index={idx + 1}
                                    title={item.title}
                                    img={item.image}
                                    price={item.price}
                                    url={item.url}/>
                                
                            </li>
                        )
                    })}

                </ul>

               </div>
            </div>
            
        </div>
    )
}

export default MyPageWish;