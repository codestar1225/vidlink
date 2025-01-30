"use client";
import FooterMobile from "@/app/_components/layout/mobile/footer";
import NavItem from "./navItem";
import AmountItem from "./amountItem";
import { useState } from "react";
import VideoItem from "@/app/(public)/videos/_components/mobile/videoItem";
import videos from "@/app/(public)/videos/_components/mobile/videos1.json";
import { Video } from "@/app/_components/ui/video";

const ProfilesMobile = ({ id }: { id: string }) => {
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
                FOLLOW
              </button>
              <button className="h-[28.88px] bg-[#002355] rounded-[4.97px] flex items-center justify-center text-[10.5px] font-semibold">
                SEND MESSAGE
              </button>
            </div>
          </div>
          <div className="flex gap-[14px] justify-center mt-[28px] mb-[33px]">
            <img src="/icon/profile/instagram.png" alt="" />
            <img src="/icon/profile/tiktok.png" alt="" />
          </div>
        </div>
        <div className="mx-[11.5px] mt-[px] ">
          <div className="flex justify-between items-center text-[8px] font-semibold tracking-wider">
            <div className="flex gap-[7px] mx-[11px] mb-[14px]">
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
export default ProfilesMobile;
