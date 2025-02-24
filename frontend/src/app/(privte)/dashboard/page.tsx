"use client";
import { isMobile } from "react-device-detect";
import dynamic from "next/dynamic";
const DashboardMobile = dynamic(() => import("./_components/mobile"));
const DashboardDesktop = dynamic(() => import("./_components/desktop"));

const Page = () => {
  return <>{isMobile ? <DashboardMobile /> : <DashboardDesktop />}</>;
};
export default Page;
