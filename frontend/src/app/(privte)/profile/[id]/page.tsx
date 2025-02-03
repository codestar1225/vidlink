import { isMobile } from "react-device-detect";
import dynamic from "next/dynamic";
const ProfilesMobile = dynamic(() => import("./_components/mobile"));
const ProfilesDesktop = dynamic(() => import("./_components/desktop"));

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  return <>{!isMobile ? <ProfilesMobile  /> : <ProfilesDesktop id={id}/>}</>;
};
export default Page;
