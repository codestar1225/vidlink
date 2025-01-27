import RegisterDesktop from "@/components/register/desktop";
import RegisterMobile from "@/components/register/mobile";
import SigninMobile from "@/components/signin/mobile";
import { isMobile } from "react-device-detect";

const Page = () => {
  return <>{!isMobile ? <SigninMobile /> : <RegisterDesktop />}</>;
};
export default Page;
