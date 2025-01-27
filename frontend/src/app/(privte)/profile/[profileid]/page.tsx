import ProfilesDesktop from "@/components/profiles/desktop";
import ProfilesMobile from "@/components/profiles/mobile";
import { isMobile } from "react-device-detect";
const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  return <>{!isMobile ? <ProfilesMobile id={id} /> : <ProfilesDesktop />}</>;
};
export default Page;
