import RegisterDesktop from "@/app/(public)/register/_components/desktop";
import RegisterMobile from "@/app/(public)/register/_components/mobile";
import { isMobile } from "react-device-detect";
const Page = () => {
  return <>{!isMobile ? <RegisterMobile /> : <RegisterDesktop />}</>;
};
export default Page;
