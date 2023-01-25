import { useCallback, useState } from "react";

const DataInput = (regExp) =>{
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
  })
  return [inputData, handler, dataError];
}
export default DataInput