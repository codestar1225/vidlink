import HomeDesktop from "@/app/_components/root/desktop";
import HomeMobile from "@/app/_components/root/mobile";
import HeaderMobile from "@/app/_components/layout/mobile/header";
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
