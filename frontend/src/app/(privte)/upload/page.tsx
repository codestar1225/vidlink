import UploadDesktop from "@/app/(privte)/upload/_components/desktop";
import UploadMobile from "@/app/(privte)/upload/_components/mobile";
import { isMobile } from "react-device-detect";
const Page = () => {
  return <>{!isMobile ? <UploadMobile /> : <UploadDesktop />}</>;
};
export default Page;
