"use client";
import useClickOutside from "@/hooks/useClickOutside";
import React, { useRef } from "react";

interface Type {
   setEdit(value: string): void;
}

const Modal: React.FC<Type> = ({ setEdit }) => {
  const menuRef = useRef<HTMLUListElement>(null);

  useClickOutside(menuRef as React.RefObject<HTMLElement>, () =>
    setEdit("")
  );

  const handleOpenCamera = () => {
    setEdit("camera");
  };
  return (
    <>
      <ul
        ref={menuRef}
        className="absolute top-[0px] -left-[5px] flex flex-col justify-between bg-[#191919] text-[13px] tracking-normal font-semibold w-[227px] h-[104px] px-[15px] py-[10px] border-[1px] rounded-[9.1px]"
      >
        <li className="flex items-center gap-[10px]">
          <img className="size-[18px]" src="/icon/profile/library.png" alt="" />
          <label htmlFor="upload">CHOOSE FROM LIBRARY</label>
        </li>
        <input type="file" id="upload" className=" hidden" />
        <li className="flex items-center gap-[10px]">
          <img className="size-[18px]" src="/icon/profile/take.png" alt="" />
          <button onClick={handleOpenCamera}>TAKE A PHOTO</button>
        </li>
        <li className="text-[#EA003B] flex items-center gap-[10px]">
          <img className="size-[18px]" src="/icon/profile/remove.png" alt="" />
          REMOVE PICTURE
        </li>
      </ul>
    </>
  );
};
export default Modal;
