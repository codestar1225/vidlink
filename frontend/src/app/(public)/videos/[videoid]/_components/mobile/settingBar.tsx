"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import ReportModal from "./modal/reportModal";
import AddModal from "./modal/addModal";
import LoginModal from "./modal/loginModal";
import { UserInfo } from "../../page";
import { useRouter } from "next/navigation";
import useVideo from "@/hooks/useVideo";

interface Type {
  handleLike(): void;
  setFollowStatus(value: boolean): void;
  isAuth: boolean;
  userInfo: UserInfo;
  cards: number;
  like: boolean;
  userId: string;
  followStatus: boolean;
}
const SettingBar: React.FC<Type> = ({
  handleLike,
  setFollowStatus,
  isAuth,
  userInfo,
  cards,
  like,
  userId,
  followStatus,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hidden, setHidden] = useState<boolean>(false);
  const router = useRouter();
  const { followUser } = useVideo();
  useEffect(() => {
    if (isAuth && isOpen && true) {
      const modal = setTimeout(() => {
        setHidden(true);
      }, 2000);
      return () => clearTimeout(modal);
    }
  }, [isOpen, isAuth]);

  const handleSuggest = () => {
    if (userInfo.owner) {
      return alert("You can't do this because you are an owner.");
    }
    setIsOpen(!isOpen);
  };
  const handleFollow = async () => {
    if (followStatus) return;
    if (userInfo.owner) {
      return alert("You can't follow because you are an owner.");
    }
    if (isAuth) {
      const res = await followUser(userId);
      if (res.status === 200 && "followStatus" in res) {
        setFollowStatus(res.followStatus);
      }
    } else {
      alert("You must log in before the following.");
    }
  };
  return (
    <>
      <div className="h-[72.58px] w-full relative flex items-center justify-center">
        <div className="absolute top-[18.6px] left-[11px] flex gap-[10.3px] items-start">
          <Link href={`/profile/${userInfo.owner ? "" : userId.trim()}`}>
            <img src="/icon/detail/avatar.svg" alt="" />
          </Link>
          <div className="flex flex-col h-[38.3px] justify-between items-start">
            <div className="text-[12px] text-blue font-semibold ">
              {userInfo.userName.toUpperCase()}
            </div>
            <div className="text-[8px] font-normal ">
              {userInfo.totalVideos || 0} VIDEOS
            </div>

            <button
              onClick={handleFollow}
              className="text-[8px] font-semibold border-[0.41px] rounded-[1.24px] px-[0.82px]"
            >
              {followStatus ? "FOLLOWED" : "FOLLOW"}
            </button>
          </div>
        </div>
        <button onClick={handleLike} className=" pl-[12px] pt-[4px]">
          {like ? (
            <img src="/icon/detail/blueHeart.png" alt="" />
          ) : (
            <img src="/icon/detail/whiteHeart.png" alt="" />
          )}
        </button>
        <div className=" absolute right-[9.23px] top-[10.6px] flex gap-[12px]">
          <div className="flex flex-col items-center gap-[5px]">
            <h1 className="text-[8px] font-semibold">CARDS</h1>
            <button className="border-[1.43px] w-[43px] h-[34px] rounded-[4.76px] text-center">
              {cards}
            </button>
          </div>
          <div className="flex flex-col items-center gap-[5px]">
            <h1 className="text-[8px] font-semibold">SUGGEST</h1>
            <div className="h-[34px] relative overflow-visible">
              <button
                onClick={handleSuggest}
                className="border-[1.43px] w-[43px] h-[34px] rounded-[4.76px] flex justify-center items-center"
              >
                <img src="/icon/detail/card/plus.svg" alt="" />
              </button>
              {isAuth && isOpen && (
                <>
                  {hidden ? (
                    <ReportModal setIsOpen={setIsOpen} setHidden={setHidden} />
                  ) : (
                    <AddModal setIsOpen={setIsOpen} setHidden={setHidden} />
                  )}
                </>
              )}
              {!isAuth && isOpen && <LoginModal setIsOpen={setIsOpen} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SettingBar;
