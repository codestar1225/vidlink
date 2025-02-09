"use client";
import FooterMobile from "@/app/_components/layout/mobile/footer";
import NavItem from "./navItem";
import AmountItem from "./amountItem";
import { useState } from "react";
import videos from "@/app/(public)/videos/_components/mobile/videos1.json";
import { signOut } from "next-auth/react";
import { useAtom } from "jotai";
import { tokenAtom } from "@/store";
import Cookies from "js-cookie";
import SocialLinks from "./socialLinks";
import Link from "next/link";
import Videos from "./videos";
import dynamic from "next/dynamic";
import AddPic from "./addPic";
const Cards = dynamic(() => import("./cards"));
const Likes = dynamic(() => import("./likes"));

const ProfileMobile = () => {
  const [nav, setNav] = useState<string>("videos");
  const [, setToken] = useAtom(tokenAtom);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/signin" });
    Cookies.remove("token");
    Cookies.remove("reqUrl");
    setToken("");
  };

  return (
    <>
      <main className=" mt-[109px] ">
        <div className="">
          <div className="relative size-[146px] mx-auto ">
            <img
              className="size-[146px] mt-[28px]"
              src="/image/profile/avatar.png"
              alt=""
            />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="absolute top-[9px] size-[18px] right-[17px]"
            >
              <img src="/icon/profile/edit.png" alt="" />
            </button>
            {isOpen && <AddPic setIsOpen={setIsOpen} />}
          </div>
          <div className="h-[147.04.67px] mx-[91px] mt-[28px] mb-[28px]">
            <div className="flex justify-between mb-[21px]">
              <AmountItem number={1860} label="FOLLOWING" />
              <AmountItem number={2546} label="PROMPTS ADDED" />
              <AmountItem number={227} label="VIDEOS" />
            </div>
            <div className="flex flex-col gap-[5.47px] ">
              <button className="h-[28.88px] bg-blue rounded-[4.97px] flex items-center justify-center text-[10.5px] font-semibold">
                DASHBOARD
              </button>
              <Link
                href={"/settings"}
                className="h-[28.88px] bg-[#7C889D] rounded-[4.97px] flex items-center justify-center text-[10.5px] font-semibold"
              >
                SETTINGS
              </Link>
              <button
                onClick={handleSignOut}
                className="h-[28.88px] bg-[#002355] rounded-[4.97px] flex items-center justify-center text-[10.5px] font-semibold"
              >
                LOG OUT
              </button>
            </div>
          </div>
          <SocialLinks />
          <Link
            href={"/upload"}
            className="flex flex-col items-center gap-[7px] text-[10.5px] font-semibold mt-[44px]"
          >
            <img src="/icon/profile/plus.png" alt="" />
            <span>NEW VIDEO</span>
          </Link>
        </div>
        <div className="mx-[11px] mt-[45px] h-[699px] overflow-hidden mb-[71px]">
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
          {nav === "videos" ? (
            <Videos videos={videos} />
          ) : nav === "cards" ? (
            <Cards />
          ) : (
            <Likes videos={videos} />
          )}
        </div>
      </main>
      <FooterMobile isFixed={false} />
    </>
  );
};
export default ProfileMobile;
