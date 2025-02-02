"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";

interface Type {
  setIsOpen(value: boolean): void;
}

const LoginModal: React.FC<Type> = ({ setIsOpen }) => {
  const menuRef = useRef<HTMLDivElement>(null);

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
    <div
      ref={menuRef}
      className="bg-[#F2F2F2] leading-[14px] text-justify absolute top-0 right-0 h-[87.24px] rounded-[8.31px] w-[182px] px-[9.97px] py-[8.31px] font-normal flex flex-col justify-between"
    >
      <h1 className="text-black text-[11.63px]">
        You need to log in first to suggest a new prompt.
      </h1>
      <Link
        className="text-[13.3px] h-[26.62px] w-[162px] bg-blue rounded-[3.32px] flex justify-center items-center"
        href={"/signin"}
      >
        LOG IN
      </Link>
    </div>
  );
};
export default LoginModal;
