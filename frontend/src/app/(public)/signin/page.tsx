'use client'
import { isMobile } from "react-device-detect";
import SigninDesktop from "./_components/desktop";
import SigninMobile from "./_components/mobile";
// import dynamic from "next/dynamic";
// const SigninDesktop = dynamic(() => import("./_components/desktop"));
// const SigninMobile = dynamic(() => import("./_components/mobile"));

const Page = () => {
  return <>{isMobile ? <SigninMobile /> : <SigninDesktop />}</>;
};
export default Page;
