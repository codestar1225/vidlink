import HeaderMobile from "@/app/_components/layout/mobile/header";
import { isMobile } from "react-device-detect";
import dynamic from "next/dynamic";
const HomeDesktop = dynamic(() => import("@/app/_components/root/desktop"));
const HomeMobile = dynamic(() => import("@/app/_components/root/mobile"));

export default function Page() {
  return (
    <>
      {!isMobile ? (
        <>
          <HeaderMobile /> <HomeMobile />
        </>
      ) : (
        <HomeDesktop />
      )}
    </>
  );
}
