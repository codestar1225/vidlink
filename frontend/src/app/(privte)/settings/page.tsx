import { isMobile } from "react-device-detect";
import SettingsMobile from "./_components/mobile";
import SettingsDesktop from "./_components/desktop";
const Page = () => {
  return <>{!isMobile ? <SettingsMobile /> : <SettingsDesktop />}</>;
};
export default Page;
