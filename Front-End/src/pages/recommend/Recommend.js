import { useSelector } from "react-redux";
import { Fragment, useState } from "react";

import LengthType from "./LengthType";
import classes from "./Recommend.module.css";
import RecommendItemBox from "./RecommendItemBox";
import { useEffect } from "react";
import axios from "axios";
// import TopLengthImage from "../../assets/clothes/상의.png";

const Recommend = () => {
  const user = useSelector(state => state.auth);
  let [clothesData, setClothesData] = useState([]);

  const url = "https://i8d105.p.ssafy.io/be/data/recommend";

  const clothesTypes = ["상의", "하의", "아우터", "신발"];

  const clothesLengthTypes = [
    { type: "어깨너비", data: user.userData.userShoulder },
    { type: "가슴단면", data: user.userData.userChest },
    { type: "소매길이", data: user.userData.userSleeve },
    { type: "허리단면", data: user.userData.userWaist },
    { type: "엉덩이단면", data: user.userData.userHip },
    { type: "허벅지단면", data: user.userData.userThigh },
    { type: "밑단단면", data: user.userData.userHem },
    { type: "키", data: user.userData.userHeight },
    { type: "신발사이즈", data: user.userData.userFoot },
  ];

  useEffect(() => {
    axios
      .post(
        url,
        {
          userId: user.userData.userId,
          userName: user.userData.userName,
          userNickname: user.userData.userNickname,
          userEmail: user.userData.userEmail,
          userGender: user.userData.userGender,
          userHeight: user.userData.userHeight,
          userShoulder : user.userData.userShoulder,
          userChest : user.userData.userChest,
          userSleeve : user.userData.userSleeve,
          userWaist : user.userData.userWaist,
          userHip : user.userData.userHip,
          userThigh : user.userData.userThigh,
          userHem : user.userData.userHem,
          userFoot:  user.userData.userFoot,
        },
        {
          headers: {
            Authorization: user.token,
          },
        }
      )
      .then((response) => {
        setClothesData([response.data["top"], response.data["bottom"], response.data["outer"], response.data["shoes"]])
      })
      .catch((error) => {
        console.log(error);
      });
  }, [])

  useEffect(() => {
    document.querySelector(`#App`).scrollIntoView({behavior: "smooth", block: "start"});
  }, []);

  return (
    <Fragment>
      <div className={classes["background"]}>
        <h1>Recommend</h1>
        <div className={classes["clothes-measure"]}>
          {clothesLengthTypes.map((data, idx) => {
            return (
              <LengthType
                timer={data.type === "키" || data.type === "신발사이즈" ? 5 : Math.floor(Math.random() * 40) + 20}
                data={data.data}
                type={data.type}
                key={`${data.type}-${idx}`}
              />
            );
          })}
        </div>
        <div className={classes.loading}></div>
        <div className={clothesData.length !== 4 ? classes.recommend : `${classes.recommend} ${classes.on}`}>
          {clothesData.map((data, idx) => {
            return <RecommendItemBox data={data} type={clothesTypes[idx]} key={`${clothesTypes[idx]}-${idx}`} />;
          })}
        </div>
      </div>
    </Fragment>
  );
};

export default Recommend;
