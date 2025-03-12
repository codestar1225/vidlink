'use client'
import dynamic from "next/dynamic";
import { isMobile } from "react-device-detect";
const SignupDesktop = dynamic(() => import("./_components/desktop"));
const SignupMobile = dynamic(() => import("./_components/mobile"));

const Page = () => {
  return <>{isMobile ? <SignupMobile /> : <SignupDesktop />}</>;
};
export default Page;
