import SignupDesktop from "@/app/(public)/signup/_components/desktop";
import SignupMobile from "@/app/(public)/signup/_components/mobile";
import { isMobile } from "react-device-detect";
const Page = () => {
  return <>{!isMobile ? <SignupMobile /> : <SignupDesktop />}</>;
};
export default Page;
