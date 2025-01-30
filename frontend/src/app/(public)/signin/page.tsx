import RegisterDesktop from "@/app/(public)/signup/_components/desktop";
import RegisterMobile from "@/app/(public)/signup/_components/mobile";
import SigninMobile from "@/app/(public)/signin/_components/mobile";
import { isMobile } from "react-device-detect";

const Page = () => {
  return <>{!isMobile ? <SigninMobile /> : <RegisterDesktop />}</>;
};
export default Page;
