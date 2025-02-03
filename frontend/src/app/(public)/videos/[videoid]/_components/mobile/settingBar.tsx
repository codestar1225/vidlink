"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import ReportModal from "./modal/reportModal";
import AddModal from "./modal/addModal";
import LoginModal from "./modal/loginModal";

interface Type {
  isAuth: boolean;
  handleLike(): void;
}
const SettingBar: React.FC<Type> = ({ isAuth,handleLike }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hidden, setHidden] = useState<boolean>(false);

  useEffect(() => {
    if (isAuth && isOpen && true) {
      const modal = setTimeout(() => {
        setHidden(true);
      }, 2000);
      return () => clearTimeout(modal);
    }
  }, [isOpen, isAuth]);
  return (
    <>
      <div className="h-[72.58px] w-full relative flex items-center justify-center">
        <div className="absolute top-[18.6px] left-[11px] flex gap-[10.3px] items-start">
          <Link href={`/profile/id`}>
            <img src="/icon/detail/avatar.svg" alt="" />
          </Link>
          <div className="flex flex-col h-[38.3px] justify-between items-start">
            <div className="text-[12px] text-blue font-semibold ">USERNAME</div>
            <div className="text-[8px] font-normal ">227 VIDEOS</div>
            <div className="text-[8px] font-semibold border-[0.41px] rounded-[1.24px] px-[0.82px]">
              FOLLOW
            </div>
          </div>
        </div>
        <button onClick={handleLike} className=" pl-[12px] pt-[4px]">
          <img src="/icon/detail/heart.svg" alt="" />
        </button>
        <div className=" absolute right-[9.23px] top-[10.6px] flex gap-[12px]">
          <div className="flex flex-col items-center gap-[5px]">
            <h1 className="text-[8px] font-semibold">CARDS</h1>
            <button className="border-[1.43px] w-[43px] h-[34px] rounded-[4.76px] text-center">
              12
            </button>
          </div>
          <div className="flex flex-col items-center gap-[5px]">
            <h1 className="text-[8px] font-semibold">SUGGEST</h1>
            <div className="h-[34px] relative overflow-visible">
              <button
                onClick={() => setIsOpen(!isOpen)}
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
