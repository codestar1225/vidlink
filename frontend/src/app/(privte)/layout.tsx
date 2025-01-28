import HeaderMobile from "@/app/_components/layout/mobile/header";
import AuthProvider from "@/provider/authProvider";
import { isMobile } from "react-device-detect";

const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AuthProvider>
        {!isMobile ? <HeaderMobile /> : <></>}
        {children}
      </AuthProvider>
    </>
  );
};
export default PrivateLayout;
