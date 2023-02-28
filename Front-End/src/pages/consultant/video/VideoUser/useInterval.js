import { useEffect, useRef } from 'react';

// useInterval
const useInterval = (callback, delay) => {
    // useRef를 이용해 렌더를 해도 초기화되지 않도록 설정
    const savedCallback = useRef();
  
    useEffect(() => {
      // callback에 변경될 때마다 최신 상태를 저장
      savedCallback.current = callback;
    }, [callback]);
  
    // 인터벌 설정
    useEffect(() => {
      const tick = () => {
        savedCallback.current();
      };
  
      if (delay !== null) {
        const timerId = setInterval(tick, delay);
        return () => clearInterval(timerId);
      }
    }, [delay]);
  };

export default useInterval;