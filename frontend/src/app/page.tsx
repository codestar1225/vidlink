import HomeDesktop from "@/components/home/desktop";
import HomeMobile from "@/components/home/mobile";
import { isMobile } from "react-device-detect";

export default function Page() {
  return <>{!isMobile ? <HomeMobile /> : <HomeDesktop />}</>;
}
