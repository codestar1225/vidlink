import ProfileDesktop from "@/components/profile/desktop";
import ProfileMobile from "@/components/profile/mobile";
import { isMobile } from "react-device-detect";
const Page = () => {
  return <>{!isMobile ? <ProfileMobile/> : <ProfileDesktop />}</>;
};
export default Page;