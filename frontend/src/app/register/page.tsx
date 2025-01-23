import RegisterDesktop from "@/components/register/desktop";
import RegisterMobile from "@/components/register/mobile";
import { isMobile } from "react-device-detect";
const Page = () => {
  return <>{!isMobile ? <RegisterMobile /> : <RegisterDesktop />}</>;
};
export default Page;
