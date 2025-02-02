import dynamic from "next/dynamic";

const VideosDesktop = dynamic(
  () => import("@/app/(public)/videos/_components/desktop"),
  { loading: () => <p></p> }
);
const VideosMobile = dynamic(
  () => import("@/app/(public)/videos/_components/mobile")
);

import { isMobile } from "react-device-detect";

const Page = () => {
  return <>{!isMobile ? <VideosMobile /> : <VideosDesktop />}</>;
};

export default Page;
