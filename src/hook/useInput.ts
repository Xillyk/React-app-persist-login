import useLocalStorage from "./useLocalStorage";

const useInput = (key: string, initValue: any) => {
  const [value, setValue] = useLocalStorage(key, initValue);

  const reset = () => {
    setValue(initValue);
  };

  const attributeObj: object = {
    value,
    onChange: (e: any) => setValue(e.target.value),
  };

  return [value, reset, attributeObj];
};

export default useInput;
