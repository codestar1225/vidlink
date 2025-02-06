"use client";
import FooterMobile from "@/app/_components/layout/mobile/footer";
import videos from "@/app/(public)/videos/_components/mobile/videos1.json";
import AmountItem from "../../../_components/mobile/amountItem";
import Videos from "../../../_components/mobile/videos";
import { useRouter } from "next/navigation";
import SocialLinks from "./socialLinks";
import useVerifyAuth from "@/hooks/useVerifyAuth";

const ProfilesMobile = () => {
  const router = useRouter();
  const { isAuth } = useVerifyAuth();

  const handleFollow = () => {
    if (isAuth) {
      return;
    } else {
      router.push("/signin");
    }
  };
  return (
    <>
      <main className="mt-[109px] ">
        <div className="">
          <img
            className="size-[146px] mt-[28px] mx-auto"
            src="/image/profile/avatar.png"
            alt=""
          />
          <div className="h-[147.04.67px] mx-[91px] mt-[28px] mb-[28.33px]">
            <div className="flex justify-between mb-[21px]">
              <AmountItem number={1860} label="FOLLOWING" />
              <AmountItem number={2546} label="PROMPTS ADDED" />
              <AmountItem number={227} label="VIDEOS" />
            </div>
            <div className="flex flex-col gap-[5.47px] ">
              <button
                onClick={handleFollow}
                className="h-[28.88px] bg-blue rounded-[4.97px] flex items-center justify-center text-[10.5px] font-semibold"
              >
                FOLLOW
              </button>
              {/* <button className="h-[28.88px] bg-[#002355] rounded-[4.97px] flex items-center justify-center text-[10.5px] font-semibold">
                SEND MESSAGE
              </button> */}
            </div>
          </div>
          <SocialLinks isAuth={isAuth} />
        </div>
        <div className="mx-[11.5px] mt-[33px] mb-[76px] ">
          <ul className="flex justify-between items-center text-[8px] font-semibold tracking-wider">
            <li className="flex gap-[7px] mx-[11px] mb-[14px]">
              <span>227&nbsp;VIDEOS</span>
              <img
                className="size-[10px]"
                src="/icon/profile/video.png"
                alt=""
              />
            </li>
            <li className="flex gap-[7px]">
              <span>NEWEST</span>
              <img
                className="size-[10px]"
                src="/icon/profile/arrow.png"
                alt=""
              />
            </li>
          </ul>
          <Videos videos={videos} />
        </div>
      </main>
      <FooterMobile isFixed={false} />
    </>
  );
};
export default ProfilesMobile;
