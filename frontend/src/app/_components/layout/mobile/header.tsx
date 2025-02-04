"use client";
import Link from "next/link";
import Item from "./Item";
import { useEffect, useState } from "react";
import useVerifyAuth from "@/hooks/useVerifyAuth";

const HeaderMobile = () => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const [isBlurred, setIsBlurred] = useState(false);
  const { loading, isAuth } = useVerifyAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsBlurred(true);
      } else {
        setIsBlurred(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (loading) return null;
  return !isOpenMenu ? (
    <header className="fixed z-10 top-0 left-0 w-screen">
      <div
        className={`${
          isBlurred ? "backdrop-blur-md bg-white/50" : "bg-transparent"
        } flex justify-between items-center mt-[27px] bg-[red] mx-[29px] p-[3px] rounded-full`}
      >
        <button onClick={() => setIsOpenMenu(true)}>
          <img src="/icon/layout/menu.svg" alt="" />
        </button>
        <div className="flex gap-[9px] h-[32px] items-center">
          {isAuth ? (
            <>
              <div className="">
                <Link href={"/message"}>
                  <img
                    className="size-[32px]"
                    src="/icon/layout/alert.png"
                    alt=""
                  />
                </Link>
              </div>
              <Link href={"/profile"}>
                <img
                  className="w-[33.95px] h-[33px]"
                  src="/icon/layout/avatar.png"
                  alt=""
                />
              </Link>
            </>
          ) : (
            <Link href={"/signin"}>
              <img className="h-[23px]" src="/icon/layout/logo.svg" alt="" />
            </Link>
          )}
        </div>
      </div>
    </header>
  ) : (
    <header className="fixed z-10 top-0 left-0 w-screen">
      <div className="pt-[30px] bg-transparent mx-[22px]">
        <button
          onClick={() => setIsOpenMenu(false)}
          className={`${
            isBlurred ? "backdrop-blur-md bg-white/50 " : "bg-transparent"
          } p-[3px] rounded-full ml-[7px] size-[32px]`}
        >
          <img src="/icon/layout/close.svg" alt="" />
        </button>
        <nav
          className={`mt-[4px] flex px-[10px] py-[8px] rounded-full justify-between
           ${isBlurred ? "backdrop-blur-md bg-white/50" : "bg-transparent"}`}
        >
          <Item url={"/"} name="HOME" setIsOpenMenu={setIsOpenMenu} />
          <Item url={"/videos"} name="VIDEOS" setIsOpenMenu={setIsOpenMenu} />
          {isAuth ? (
            <>
              <Item
                url={"/upload"}
                name="UPLOAD"
                setIsOpenMenu={setIsOpenMenu}
              />
              <Item
                url={"/profile"}
                name="PROFILE"
                setIsOpenMenu={setIsOpenMenu}
              />
            </>
          ) : (
            <>
              <Link
                href={"/signin"}
                onClick={() => setIsOpenMenu(false)}
                className="border-[1.07px] h-[18.39px] text-[#303030] border-[#303030] font-semibold  rounded-[3.2px] text-[15px]  px-[2.13px] tracking-widest "
              >
                UPLOAD
              </Link>
              <Link
                href={"/signin"}
                onClick={() => setIsOpenMenu(false)}
                className="border-[1.07px] h-[18.39px] text-[#303030] border-[#303030] font-semibold  rounded-[3.2px] text-[15px]  px-[2.13px] tracking-widest "
              >
                PROFILE
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};
export default HeaderMobile;
