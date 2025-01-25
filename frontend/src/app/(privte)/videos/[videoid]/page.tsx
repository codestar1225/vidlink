import VideoDesktop from "@/components/video/desktop";
import VideoMobile from "@/components/video/mobile";
import { isMobile } from "react-device-detect";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  return <>{!isMobile ? <VideoMobile id={id} /> : <VideoDesktop id={id} />}</>;
};
export default Page;
