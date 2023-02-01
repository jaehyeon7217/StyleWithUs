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
  }, [regExp]);

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
  }, [password]);

  return [inputData, handler, dataError];
};

// 유저유효성 검사
export const UserValidCheck = (kind) =>{
  const [validError, setError] = useState(true);

  const handler = useCallback((event)=>{
    event.preventDefault();
    if (event.target.value !== ""){
    const url = "http://43.201.72.251:8082/be/user/valid/" + kind + "/" + event.target.value;
    axios.get(url).then(response =>{
      if (response.data === false){
        setError(true)
      }else{
        setError(false)
      }
    }).catch(error => {
      console.log(error)
    });}
  }, [kind]);
  return [validError, handler];
}

export const ConsultantValidCheck = (kind) =>{
  const [validError, setError] = useState(true);

  const handler = useCallback((event)=>{
    event.preventDefault();
    if (event.target.value !== ""){
    const url = "https://43.201.72.251:8082/be/consultant/valid/" + kind + "/" + event.target.value;
    axios.get(url).then(response =>{
      if (response.data === false){
        setError(true)
      }else{
        setError(false)
      }
    }).catch(error => {
      console.log(error)
    });}
  }, [kind]);
  return [validError, handler];
}