import ProfileDesktop from "@/app/(privte)/profile/_components/desktop";
import ProfileMobile from "@/app/(privte)/profile/_components/mobile";
import { isMobile } from "react-device-detect";
const Page = () => {
  return <>{!isMobile ? <ProfileMobile/> : <ProfileDesktop />}</>;
};
export default Page;