"use client";
import Link from "next/link";
import Item from "./headerItem";
import { useEffect, useRef, useState } from "react";
import useVerifyAuth from "@/hooks/useVerifyAuth";
import useClickOutside from "@/hooks/useClickOutside";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const HeaderMobile = () => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const [isAnimate, setIsAnimate] = useState<boolean>(false);
  const [isBlurred, setIsBlurred] = useState(false);
  const [pic, setPic] = useState<string>("/icon/avatar/avatar.png");
  const menuRef = useRef<HTMLHeadElement>(null);
  const router = useRouter();

  const { loading, isAuth } = useVerifyAuth();

  useEffect(() => {
    if (isAuth) {
      const user = Cookies.get("user");
      if (user) {
        const parsedUser = JSON.parse(user);
        setPic(parsedUser.pic);
      }
    }
  }, [isAuth, router]);

  useEffect(() => {
    if (typeof window === "undefined") return;
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

  useClickOutside(menuRef as React.RefObject<HTMLElement>, () =>
    setIsOpenMenu(false)
  );

  useEffect(() => {
    isOpenMenu ? setIsAnimate(true) : setIsAnimate(false);
  }, [isOpenMenu]);

  if (loading) return null;
  return !isOpenMenu ? (
    //Closed header
    <header className="fixed z-10 top-0 left-0 w-screen">
      <div
        className={`${
          isBlurred ? "backdrop-blur-md bg-white/50" : "bg-transparent"
        } flex justify-between items-center mt-[27px] bg-[red] mx-[30px] px-[3px] py-[3px] rounded-full`}
      >
        <button onClick={() => setIsOpenMenu(true)} className="size-[32px]">
          <img src="/icon/layout/menu.png" alt="" />
        </button>
        <div className="flex gap-[9px] h-[32px] items-center">
          {isAuth ? (
            <>
              <Link href={"/message"}>
                <img
                  className="size-[32px]"
                  src="/icon/layout/alert.png"
                  alt=""
                />
              </Link>
              <Link href={"/profile"}>
                <img
                  className="w-[33.95px] h-[33px] rounded-full"
                  src={pic}
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
    // opened header
    <header ref={menuRef} className={`fixed z-10 top-0 left-0 w-screen `}>
      <div className="pt-[30px] bg-transparent mx-[22px]">
        <button
          onClick={() => setIsOpenMenu(false)}
          className={`${
            isBlurred ? "backdrop-blur-md bg-white/50 " : "bg-transparent"
          } p-[3px] rounded-full ml-[7px] size-[32px]`}
        >
          <img src="/icon/layout/close.png" alt="" />
        </button>
        <nav
          className={`${
            isAnimate ? "scale-y-[1]" : "scale-y-[0]"
          } transition-all duration-300 mt-[4px] flex px-[10px] py-[8px] rounded-full justify-between
           ${isBlurred ? "backdrop-blur-md bg-white/50" : "bg-transparent"}`}
        >
          <Item
            setIsOpenMenu={setIsOpenMenu}
            url={"/"}
            name="HOME"
            isAuth={true}
          />
          <Item
            setIsOpenMenu={setIsOpenMenu}
            url={"/videos"}
            name="VIDEOS"
            isAuth={true}
          />
          <Item
            setIsOpenMenu={setIsOpenMenu}
            url={"/upload"}
            name="UPLOAD"
            isAuth={isAuth}
          />
          <Item
            setIsOpenMenu={setIsOpenMenu}
            url={"/profile"}
            name="PROFILE"
            isAuth={isAuth}
          />
        </nav>
      </div>
    </header>
  );
};
export default HeaderMobile;
