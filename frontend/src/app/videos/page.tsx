import VideosDesktop from "@/components/videos/desktop";
import VideosMobile from "@/components/videos/mobile";
import { isMobile } from "react-device-detect";
const Page = () => {
  return <>{!isMobile ? <VideosMobile /> : <VideosDesktop />}</>;
};
export default Page;
