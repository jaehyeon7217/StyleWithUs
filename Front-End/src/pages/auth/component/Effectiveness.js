import { useCallback, useState } from "react";
import axios from "axios";
// 입력값 저장 및 유효성 검사 진행
export const DataInput = (regExp) =>{
  const [inputData, setInputData] = useState("");
  const [dataError, setError] = useState(true);
  
  const handler = useCallback((event) =>{
    const data = event.target.value;
    setInputData(data);
    if (data===""){
      setError(true);
    }else if (!regExp.test(data)){
      setError(false);
    }else {
      setError(true);
    };
  });

  return [inputData, handler, dataError];
};

//비밀번호 일치 검사
export const CheckPassword = (password) => {
  const [inputData, setInputData] = useState("");
  const [dataError, setError] = useState(true);

  const handler = useCallback((event) =>{
    const data = event.target.value;
    setInputData(data)
    if (data===""){
      setError(true);
    }else if (data !== password){
      setError(false);
    }else {
      setError(true);
    };
  });

  return [inputData, handler, dataError];
};


export const ValidCheck = (kind) =>{
  const [validError, setError] = useState("");

  const handler = useCallback((event)=>{
    event.preventDefault();
    if (event.target.value !== ""){
    const url = "http://192.168.100.81/user/valid/" + kind + "/" +event.target.value;
    axios.get(url).then(response =>{
      if (response.data === false){
        setError("true")
        console.log("true")
      }else{
        setError("false")
        console.log("false")
      }
    }
      ).catch(error => {
      console.log(error)
    });}
  });
  return [validError, handler];
}