import { useCallback, useState } from "react";

export const IdInput = () => {
  const [data, setData] = useState("");
  const [dataError, setError] = useState(true);
  
  const handler = useCallback((event) => {
    const regExp = /^[a-zA-z0-9]{5,20}$/;
    const text = event.target.value;
    setData(text);
    if (text===""){
      setError(true);
    }else if (!regExp.test(text)){
      setError(false);
    }else {
      setError(true);
    };
  });

  return [data, handler, dataError];
};

export const PasswordInput = () => {
  const [data, setData] = useState("");
  const [dataError, setError] = useState(true);
  
  const handler = useCallback((event) => {
    const regExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{9,16}$/;
    const text = event.target.value;
    setData(text);
    if (text===""){
      setError(true);
    }else if (!regExp.test(text)){
      setError(false);
    }else {
      setError(true);
    };
  });

  return [data, handler, dataError];
};

export const NameInput = () => {
  const [data, setData] = useState("");
  const [dataError, setError] = useState(true);

  const handler = useCallback((event)=>{
    const regExp = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{2,10}/;
    const text = event.target.value;
    setData(text);
    if (text===""){
      setError(true);
    }else if(regExp.test(text)){
      setError(false);
    }else{
      setError(true);
    };
  });

  return [data, handler, dataError];
};

export const NinkNameInput = () => {
  const [data, setData] = useState("");
  const [dataError, setError] = useState(true);

  const handler = useCallback((event)=>{
    const regExp = /^[a-zA-z0-9]{3,20}$/;
    const text = event.target.value;
    setData(text);
    if (text===""){
      setError(true);
    }else if(regExp.test(text)){
      setError(false);
    }else{
      setError(true);
    };
  });

  return [data, handler, dataError];
};

export const EmailInput = () =>{
  const [data, setData] = useState("");
  const [dataError, setError] = useState(true);

  const handler = useCallback((event)=>{
    const regExp = /^([0-9a-zA-Z_-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    const text = event.target.value;
    setData(text);
    if (text===""){
      setError(true);
    }else if(regExp.test(text)){
      setError(false);
    }else{
      setError(true);
    };
  });

  return [data, handler, dataError];
};

export const ResumeInput = () => {
  const [data, setData] = useState("");
  const [dataError, setError] = useState(true);

  const handler = useCallback((event) => {
    const text = event.target.value;
    setData(text);
    if (text===""){
      setError(true);
    }else if(text.length>1000){
      setError(false);
    }else{
      setError(true);
    };
  });

  return [data, handler, dataError];
};