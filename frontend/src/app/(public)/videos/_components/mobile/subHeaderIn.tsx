"use client";
import { useState } from "react";

interface Type {
  replace: string;
  setReplace(value: string): void;
}

const subHeaderIn: React.FC<Type> = ({ replace, setReplace }) => {
  return (
    <>
      <header className="pt-[103px] flex flex-col items-center gap-[28.1px] mx-[22px]">
        <div className="flex gap-[83px]">
          <button
            onClick={() => setReplace("you")}
            className={`${
              replace === "you" ? "text-blue font-bold" : "text-[#3C4450] font-semibold "
            } text-[20px] leading-[18.07px] underline underline-offset-[25%]`}
          >
            FOR YOU
          </button>
          <button
            onClick={() => setReplace("follow")}
            className={`${
              replace === "follow" ? "text-blue font-bold" : "text-[#3C4450] font-semibold "
            } text-[20px] leading-[18.07px] underline underline-offset-[25%]`}
          >
            FOLLOWING
          </button>
        </div>
        <input
          className="w-full h-[27px] rounded-[20px] border border-[#777777] outline-offset-1 px-[12px] py-[5.4px] mb-[20.5px] placeholder-[#5B5B5B]"
          type="search"
          placeholder="SEARCH..."
        />
      </header>
    </>
  );
};
export default subHeaderIn;
