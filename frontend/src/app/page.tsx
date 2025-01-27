import HomeDesktop from "@/components/home/desktop";
import HomeMobile from "@/components/home/mobile";
import HeaderMobile from "@/components/layout/mobile/header";
import { isMobile } from "react-device-detect";

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
