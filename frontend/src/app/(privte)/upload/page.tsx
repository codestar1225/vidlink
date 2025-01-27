import UploadDesktop from "@/components/upload/desktop";
import UploadMobile from "@/components/upload/mobile";
import { isMobile } from "react-device-detect";
const Page = () => {
  return <>{!isMobile ? <UploadMobile /> : <UploadDesktop />}</>;
};
export default Page;
