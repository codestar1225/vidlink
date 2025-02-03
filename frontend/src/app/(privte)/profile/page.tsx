import dynamic from "next/dynamic";
import { isMobile } from "react-device-detect";
const ProfileDesktop = dynamic(() => import("./_components/desktop"));
const ProfileMobile = dynamic(() => import("./_components/mobile"));

const Page = () => {
  return <>{!isMobile ? <ProfileMobile /> : <ProfileDesktop />}</>;
};
export default Page;
