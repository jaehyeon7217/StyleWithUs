import { Fragment, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import classes from "./MyPersonalColor.module.css";

import Image from "../../assets/personal/personalcolorman.png"
import ConsultantImage from "../../assets/girlface.png"

const MyPersonalColor = () => {
  const [pageOn, setPageOn] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [imageSrc, setImgSrc] = useState(ConsultantImage);
  const [spring, setSpring] = useState(0);
  const [summer, setSummer] = useState(0);
  const [fall, setFall] = useState(0);
  const [winter, setWinter] = useState(0);
  const [backgroundNumber, setBackgroundNumber] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    setPageOn(true);
  }, []);

  const backgroundColorList = [
    '#FEF200', '#FDF797', '#FFE59E', '#FFFFFF', '#F16532', '#F4F4DC', '#E99519', '#F1ED58', '#E61A23', '#CDEBEB', '#E46F1F', '#8ED2C5', '#F2635D', '#A1C5DD', '#DE3A21', '#E2F0D7', '#F69D8D', '#01456A', '#B32018', '#013B2F', '#D5E14D', '#C9CAE8', '#893103', '#7F8084', '#9FD067', '#9A9ACC', '#9F6714', '#000000', '#6FB440', '#DACDDF', '#9C7E10', '#FEECEA', '#00A261', '#EED6E6', '#CBB778', '#E7E7E9', '#46C4D3', '#F9B9D4', '#79A12E', '#5F6062', '#B8785D', '#E1EEC3', '#4E6F18', '#38383A', '#DEA077', '#E3DEB6', '#D7A010', '#EBDEE5', '#F8931D', '#CB7D95', '#B25C11', '#DAE5EB', '#FFC353', '#B95EA4', '#C0AF01', '#01B6CB', '#FEE0BA', '#0193CF', '#B3AB7D', '#FFFAC3'
  ]

  const AddPageNumber = () => {
    if (pageNumber === 2) {
      backgroundChange();
    }
    setPageNumber(prevState => {
      return prevState + 1;
    })
  };

  const setThumbnail = (event) => {
    let reader = new FileReader();

    reader.onload = function(event) {
      let img = document.createElement("img");
      img.setAttribute("src", event.target.result);
      setImgSrc(event.target.result);
      const imgContainer = document.getElementById("image_container");
      imgContainer.removeChild(imgContainer.firstElementChild);
      imgContainer.appendChild(img);
    };

    reader.readAsDataURL(event.target.files[0]);
  };

  const backgroundChange = () => {
    const backgroundTag = document.getElementById("background");
    if (backgroundNumber < 45) {
      backgroundTag.style.background = backgroundColorList[backgroundNumber];
      setBackgroundNumber(prevState => {
        return prevState + 1;
      })
    } else {
      backgroundTag.style.background = 'linear-gradient(90deg, rgba(190,187,240,1) 0%, rgba(255,191,244,1) 38%, rgba(245,210,200,1) 100%)';
      AddPageNumber();
    }
  };

  const downScore = () => {
    if ((backgroundNumber - 1) % 4 === 0) {
      setSpring(prevState => prevState - 1);
    } else if ((backgroundNumber - 1) % 4 === 1) {
      setSummer(prevState => prevState - 1);
    } else if ((backgroundNumber - 1) % 4 === 2) {
      setFall(prevState => prevState - 1);
    } else if ((backgroundNumber - 1) % 4 === 3) {
      setWinter(prevState => prevState - 1);
    }

    backgroundChange();
  };

  const normalScore = () => {
    backgroundChange();
  };

  const upScore = () => {
    if ((backgroundNumber - 1) % 4 === 0) {
      setSpring(prevState => prevState + 1);
    } else if ((backgroundNumber - 1) % 4 === 1) {
      setSummer(prevState => prevState + 1);
    } else if ((backgroundNumber - 1) % 4 === 2) {
      setFall(prevState => prevState + 1);
    } else if ((backgroundNumber - 1) % 4 === 3) {
      setWinter(prevState => prevState + 1);
    }

    backgroundChange();
  };

  const pageChange = () => {
    if (spring === Math.max(spring, summer, fall, winter)) {
      navigate('/mypersonal-color/spring');
    } else if (summer === Math.max(spring, summer, fall, winter)) {
      navigate('/mypersonal-color/summer');
    } else if (fall === Math.max(spring, summer, fall, winter)) {
      navigate('/mypersonal-color/fall');
    } else if (winter === Math.max(spring, summer, fall, winter)) {
      navigate('/mypersonal-color/winter');
    }
  };

  return (
    <Fragment>
      <div className={`${classes.background} ${!pageOn ? classes.off : ""}`} id="background">
        <div className={`${classes.words} ${pageNumber >= 3 ? classes.off : ""}`}>
          <h1 className={classes.h1}>퍼스널 컬러 자가진단</h1>
        </div>
        <div className={classes.container}>
          <div className={`${classes['box']} ${pageNumber === 1 ? classes.on : classes.off}`}>
            <p className={classes.p}>나는 봄/가을 웜톤일까? 여름/가을 쿨톤일까?</p>
            <img src={Image} alt="man" />
            <button onClick={AddPageNumber}>검사 시작하기</button>
          </div>
          <div className={`${classes['box']} ${pageNumber < 2 ? "" : pageNumber === 2? classes.on : classes.off}`}>
            <p className={classes.p}>정확한 진단을 위해 아래와 같은 얼굴 사진을 첨부해 주세요</p>
            <p className={classes.subP}>· 실제 얼굴과 가장 가까운 사진</p>
            <p className={classes.subP}>· 바른 자세의 목 위 얼굴 사진</p>
            <p className={classes.subP}>· 잔잔한 미소를 띈 사진</p>
            <div id="image_container" className={classes["image-container"]}>
              <img src={ConsultantImage} alt="faceImg" />
            </div>
            <label htmlFor="file">
              <div className={classes['btn-upload']}>이미지 첨부하기</div>
            </label>
            <input type="file" id="file" name="file" accept="image/*" onChange={setThumbnail}/>
            <p onClick={AddPageNumber} className={classes.checkStart}>준비가 되셨으면 클릭!</p>
          </div>
          <div className={`${classes['box']} ${pageNumber < 3 ? "" : pageNumber === 3? classes.on : classes.off}`}>
            <img src={imageSrc} alt="img" />
            <div className={classes['btn-box']}>
              <button onClick={downScore}>안 어울려요</button>
              <button onClick={normalScore}>보통이에요</button>
              <button onClick={upScore}>잘 어울려요</button>
            </div>
          </div>
          <div className={classes.box}>
            <h1 className={classes.h1}>퍼스널 컬러 진단 완료</h1>
            <p className={classes.p} onClick={pageChange}>당신의 퍼스널 컬러 확인하러 가기!</p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default MyPersonalColor;