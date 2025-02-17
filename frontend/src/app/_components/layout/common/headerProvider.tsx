"use client";
import { isMobile } from "react-device-detect";
import HeaderMobile from "../mobile/header";

const HeaderProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {isMobile ? <HeaderMobile /> : <></>}
      {children}
    </>
  );
};
export default HeaderProvider;
