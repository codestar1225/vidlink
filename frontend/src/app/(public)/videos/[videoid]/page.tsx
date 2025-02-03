import dynamic from "next/dynamic";
import { isMobile } from "react-device-detect";
const VideoDesktop = dynamic(() => import("./_components/desktop"));
const VideoMobile = dynamic(() => import("./_components/mobile"));

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  return <>{!isMobile ? <VideoMobile /> : <VideoDesktop id={id} />}</>;
};
export default Page;
