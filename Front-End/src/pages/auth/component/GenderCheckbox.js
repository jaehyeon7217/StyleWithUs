import { useCallback, useState } from "react";

export const GenderCheckbox = () => {
  const [male, setMale] = useState(true);
  const [female, setFemale] = useState(false);
  const maleHandler = useCallback((event) => {
    if (event) {
      setMale(true);
      setFemale(false);
    }
  });
  const femaleHandler = useCallback((event) => {
    if (event) {
      setFemale(true);
      setMale(false);
    }
  });
  return [male, female, maleHandler, femaleHandler];
};
