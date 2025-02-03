import HeaderMobile from "@/app/_components/layout/mobile/header";
import { isMobile } from "react-device-detect";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {!isMobile ? <HeaderMobile /> : <></>}
      {children}
    </>
  );
};
export default Layout;
