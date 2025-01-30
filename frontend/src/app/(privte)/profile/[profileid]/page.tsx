import { isMobile } from "react-device-detect";
import ProfilesMobile from "./_components/mobile";
import ProfileDesktop from "../_components/desktop";
const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  return <>{!isMobile ? <ProfilesMobile id={id} /> : <ProfileDesktop />}</>;
};
export default Page;
