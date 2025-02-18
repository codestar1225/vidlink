import { useCallback, useEffect } from "react";
import InputItem from "../inputItem";
import useVideo from "@/hooks/useVideo";

interface Type {
  setUserName(value: string): void;
  setIsRepeated(value: boolean): void;
  setCaution(value: string): void;
  setCheckingName(value: boolean): void;
  userName: string;
}

const Index: React.FC<Type> = ({
  setUserName,
  setIsRepeated,
  setCaution,
  setCheckingName,
  userName,
}) => {
  const { checkUserName, loading } = useVideo();
  //validate the user name if there already is such username.
  const validateUserName = useCallback(
    async (userName: string) => {
      if (/[!@#$%^&*?><":;'`]/.test(userName)) {
        setCaution("You can't use special characters in your username.");
        setIsRepeated(false);
        return;
      } else {
        setCaution("");
      }
      const res = await checkUserName(userName);
      if (res.status === 200 && "isAlreadyOne" in res) {
        setIsRepeated(res.isAlreadyOne);
      } else {
        alert(res.message);
        setCaution(res.message);
      }
    }, // Adjust debounce delay as needed
    [checkUserName]
  );
  useEffect(() => {
    if (userName && !loading) {
      setCheckingName(true);
      const check = setTimeout(() => {
        validateUserName(userName);
      }, 500);
      setCheckingName(false);
      return () => clearTimeout(check);
    }
    if (!userName) {
      setCaution("");
      setIsRepeated(false);
    }
  }, [userName]);

  return (
    <>
      <InputItem
        name="username"
        holderName="Text"
        setValue={setUserName}
        value={userName.trim().toLowerCase()}
      />
    </>
  );
};
export default Index;
