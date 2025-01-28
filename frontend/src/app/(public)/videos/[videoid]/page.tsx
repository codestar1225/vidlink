import VideoDesktop from "@/app/(public)/videos/[videoid]/_components/desktop";
import VideoMobile from "@/app/(public)/videos/[videoid]/_components/mobile";
import { isMobile } from "react-device-detect";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  return <>{!isMobile ? <VideoMobile id={id} /> : <VideoDesktop id={id} />}</>;
};
export default Page;
