import RegisterDesktop from "@/app/(public)/register/_components/desktop";
import RegisterMobile from "@/app/(public)/register/_components/mobile";
import SigninMobile from "@/app/(public)/signin/_components/mobile";
import { isMobile } from "react-device-detect";

const Page = () => {
  return <>{!isMobile ? <SigninMobile /> : <RegisterDesktop />}</>;
};
export default Page;
