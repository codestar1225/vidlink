"use client";
// import dynamic from "next/dynamic";
import { isMobile } from "react-device-detect";
import UploadMobile from "./_components/mobile";
import UploadDesktop from "./_components/desktop";
// const UploadDesktop = dynamic(() => import("./_components/desktop"));
// const UploadMobile = dynamic(() => import("./_components/mobile"));

const Page = () => {
  return <>{isMobile ? <UploadMobile /> : <UploadDesktop />}</>;
};
export default Page;
