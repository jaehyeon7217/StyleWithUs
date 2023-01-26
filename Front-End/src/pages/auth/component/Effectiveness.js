import { useCallback, useState } from "react";

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