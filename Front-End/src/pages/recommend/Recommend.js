import classes from './Recommend.module.css';
import userImage from "../../assets/mypageuser.png";
import { useSelector } from 'react-redux';
import RecommendItem from './RecommendItem';


const Recommend = () => {
    const userData = useSelector((state) => state.auth.userData)

    const cartItems = useSelector((state)=>state.cart.cartItems)

    return (
        <div>
            <div className={classes.RecommendPageBox}>
                <div className={classes.RecommendPage}>
                    <div className={classes.UserBox}>
                        <img src={userImage} alt="user" className={classes.userImg} />
                        <div>
                            <h3 className={classes.userNickname}>{userData.userNickname}</h3>
                            <p className={classes.userGender}> {(userData.userGender) ? "남": "여"}({userData.userAge})</p>
                        </div>
                        <div className={classes.userDataItem}>
                            <p className={classes.userData}>키</p>
                            <p className={classes.userDataDap}>{userData.userHeight}</p>
                        </div>
                        <div className={classes.userDataItem}>
                            <p className={classes.userData}>상의</p>
                            <p className={classes.userDataDap}>{userData.userHeight}</p>
                        </div>
                        <div className={classes.userDataItem}>
                            <p className={classes.userData}>하의</p>
                            <p className={classes.userDataDap}>{userData.userHeight}</p>
                        </div>
                        <div className={classes.userDataItem}>
                            <p className={classes.userData}>발사이즈</p>
                            <p className={classes.userDataDap}>{userData.userHeight}</p>
                        </div>
                    </div>
                    <div className={classes.vline}></div>
                    <div className={classes.recommendBox}>
                        <div className={classes.recommendItemBox}>
                            <h2 className={classes.recommendItem}>아우터</h2>
                            <div className={classes.WarpAllItem}>
                                {cartItems.map((item, idx) => {
                                    return (
                                        <div key={idx} className={classes.CartItemDiv}>
                                            <RecommendItem
                                                index={idx + 1}
                                                title={item.title}
                                                img={item.image}
                                                price={item.price}
                                                url={item.url}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                            
                        </div>
                        <div className={classes.recommendItemBox}>
                            <h2 className={classes.recommendItem}>상의</h2>
                        </div>
                        <div className={classes.recommendItemBox}>
                            <h2 className={classes.recommendItem}>하의</h2>
                        </div>
                        <div className={classes.recommendItemBox}>
                            <h2 className={classes.recommendItem}>신발</h2>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
};

export default Recommend;