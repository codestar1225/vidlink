"use client";
import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

interface Type {
  setIsOpen(value: boolean): void;
}

const AddPic: React.FC<Type> = ({ setIsOpen }) => {
  const webcamRef = useRef<Webcam>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const [, setPhoto] = useState<string | null>(null);

  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    setPhoto(imageSrc || null);
  };
  // Close the menu if the click is outside
  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false); // Close the menu
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener when the component is unmounted
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>
      <ul
        ref={menuRef}
        className=" absolute top-[30px] right-1/2 translate-x-1/2  flex flex-col justify-between bg-[#191919] text-[13px] font-semibold w-[227px] h-[104px] px-[15px] py-[10px] border-[1px] rounded-[9.1px]"
      >
        <li className=" flex items-center gap-[10px]">
          <img className="size-[18px]" src="/icon/profile/library.png" alt="" />
          <label htmlFor="upload">CHOOSE FROM LIBRARY</label>
        </li>
        <input type="file" id="upload" className=" hidden" />
        <li className="flex items-center gap-[10px]">
          <img className="size-[18px]" src="/icon/profile/take.png" alt="" />
          <button onClick={capture}>TAKE A PHOTO</button>
        </li>
        <li className="text-[#EA003B] flex items-center gap-[10px]">
          <img className="size-[18px]" src="/icon/profile/remove.png" alt="" />
          REMOVE PICTURE
        </li>
      </ul>
      {/* <div> */}
      <Webcam ref={webcamRef} screenshotFormat="image/png" />
      {/* {photo && <img src={photo} alt="Captured" />} */}
      {/* </div> */}
    </>
  );
};
export default AddPic;
