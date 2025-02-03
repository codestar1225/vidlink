import dynamic from "next/dynamic";
import { isMobile } from "react-device-detect";
const VideosDesktop = dynamic(
  () => import("./_components/desktop")
);
const VideosMobile = dynamic(
  () => import("./_components/mobile")
);



const Page = () => {
  return <>{!isMobile ? <VideosMobile /> : <VideosDesktop />}</>;
};

export default Page;
