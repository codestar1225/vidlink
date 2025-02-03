import { isMobile } from "react-device-detect";
import dynamic from "next/dynamic";

const SettingsMobile = dynamic(() => import("./_components/mobile"));
const SettingsDesktop = dynamic(() => import("./_components/desktop"));

const Page = () => {
  return <>{!isMobile ? <SettingsMobile /> : <SettingsDesktop />}</>;
};
export default Page;
