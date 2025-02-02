import { isMobile } from "react-device-detect";
import PrivateHeaderMobile from "../_components/layout/mobile/header";
import HeaderMobile from "../_components/layout/mobile/header";

const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {!isMobile ? <HeaderMobile /> : <></>}
      {children}
    </>
  );
};
export default PrivateLayout;
