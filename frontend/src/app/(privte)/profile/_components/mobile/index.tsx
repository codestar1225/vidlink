"use client";
import FooterMobile from "@/app/_components/layout/mobile/footer";
import NavItem from "./navItem";
import AmountItem from "./amountItem";
import { useState } from "react";
import VideoItem from "@/app/(public)/videos/_components/mobile/videoItem";
import videos from "../../../../(public)/videos/_components/mobile/videos1.json";
import { Video } from "@/app/_components/ui/video";
import { signOut } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";

const ProfileMobile = () => {
  const [nav, setNav] = useState<string>("videos");
  return (
    <>
      <main className="w-screen mt-[109px] ">
        <div className="">
          <div className="relative size-[146px] mx-auto ">
            <img
              className="size-[146px] mt-[28px]"
              src="/image/profile/avatar.png"
              alt=""
            />
            <img
              className="absolute top-[9px] size-[18px] right-[17px]"
              src="/icon/profile/edit.png"
              alt=""
            />
          </div>
          <div className="h-[147.04.67px] mx-[91px] mt-[28px]">
            <div className="flex justify-between mb-[21px]">
              <AmountItem number={1860} label="FOLLOWING" />
              <AmountItem number={2546} label="PROMPTS ADDED" />
              <AmountItem number={227} label="VIDEOS" />
            </div>
            <div className="flex flex-col gap-[5.47px] ">
              <button className="h-[28.88px] bg-blue rounded-[4.97px] flex items-center justify-center text-[10.5px] font-semibold">
                DASHBOARD
              </button>
              <button className="h-[28.88px] bg-[#7C889D] rounded-[4.97px] flex items-center justify-center text-[10.5px] font-semibold">
                SETTINGS
              </button>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="h-[28.88px] bg-[#002355] rounded-[4.97px] flex items-center justify-center text-[10.5px] font-semibold"
              >
                LOG OUT
              </button>
            </div>
          </div>
          <div className="flex gap-[14px] justify-center mt-[28px] mb-[44px]">
            <img src="/icon/profile/instagram.png" alt="" />
            <img src="/icon/profile/tiktok.png" alt="" />
          </div>
          <div className="flex flex-col items-center gap-[7px] text-[10.5px] font-semibold">
            <img src="/icon/profile/plus.png" alt="" />
            <div>NEW VIDEO</div>
          </div>
        </div>
        <div className="mx-[11.5px] mt-[45px] ">
          <nav className="flex justify-between relative">
            <NavItem name="videos" nav={nav} setNav={setNav} />
            <NavItem name="cards" nav={nav} setNav={setNav} />
            <NavItem name="likes" nav={nav} setNav={setNav} />
            <div className="border-[0.5px] absolute bottom-[1px] left-0 w-full -z-10"></div>
          </nav>
          <div className="flex justify-between items-center text-[8px] font-semibold tracking-wider">
            <div className="flex gap-[7px] mx-[11px] mt-[24px] mb-[14px]">
              <span>227&nbsp;VIDEOS</span>
              <img
                className="size-[10px]"
                src="/icon/profile/video.png"
                alt=""
              />
            </div>
            <div className="flex gap-[7px]">
              <span>NEWEST</span>
              <img
                className="size-[10px]"
                src="/icon/profile/arrow.png"
                alt=""
              />
            </div>
          </div>
          <ul className="overflow-scroll gap-x-[11px] gap-y-[11.25px] flex flex-wrap justify-center items-start mb-[71px]">
            {videos.map((item, index) => (
              <li
                className="w-[118.43px] h-[86.48px] rounded-[8.37px] overflow-hidden "
                key={index}
              >
                <Video src={item.src} />
              </li>
            ))}
          </ul>
        </div>
      </main>
      <FooterMobile isFixed={false} />
    </>
  );
};
export default ProfileMobile;
