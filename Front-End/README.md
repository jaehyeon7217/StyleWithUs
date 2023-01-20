# 프론트엔드(FRONT-END)



## 💡 개발 환경 

```
node.js : 18.13.0
react : 18.2.0
axios : 1.2.2
react-redux : 8.0.5
react-router-dom : 6.6.2
@reduxjs/toolkit": 1.9.1
```



## 코딩 스타일 가이드

component, css 문법 통일 양식

```react
// componentExample.js

import classes from "./componentExample.module.css";
import imageExample from "../assets/image.png";

const componentName = () =>{
  ...
  return(
    <div className="classes.box">
      <img src={imageExample} alt="img"/>
	  <p>This is sample<p/>
	<div/>
  );
}

export default componentName;
```

```css
/* componentExample.module.css */

@font-face{
  font-family: "SF_Pro";
  src: url("./fonts/SF-Pro-Display-Regular.otf");
}

.box {
	display: grid;
}

.box img{
	width: 100px;
}

.box p{
	font-family: "SF_Pro";
}

```



## 설치 패키지 목록

```bash
$ npm install

$ npm install react-redux react-router-dom @reactjs/toolkit
```

* package에 다 넣어놓았기 때문에 npm install만해도 됩니다.
* 혹시 설치가 안되었을 경우에만 아래 패키지들을 설치해주세요!