// 'use client'
import dynamic from "next/dynamic";
  import { isMobile } from "react-device-detect";
import UploadMobile from "./_components/mobile";
const UploadDesktop = dynamic(() => import("./_components/desktop"));
// const UploadMobile = dynamic(() => import("./_components/mobile"));

const Page = () => {
 
  return <>{isMobile ?<UploadDesktop />: <UploadMobile />  }</>;
};
export default Page;
