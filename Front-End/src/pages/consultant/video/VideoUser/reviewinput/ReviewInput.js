import { useCallback, useState } from "react";

export const DataInput = () => {
  const [inputData, setInputData] = useState("");
  const [dataError, setError] = useState(true);

  const handler = useCallback(
    (event) => {
      const data = event.target.value;
      setInputData(data);
      if (data === "" || data === undefined) {
        setError(true);
      } else if (data < 0.1 || data > 5.0) {
        setError(false);
      } else {
        setError(true);
      }
    },
    []
  );

  return [inputData, handler, dataError];
};