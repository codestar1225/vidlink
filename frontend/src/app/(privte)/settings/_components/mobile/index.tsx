"use client";
import { useState } from "react";
import GenderItem from "./genderItem";
import InputItem from "./inputItem";
import FooterMobile from "@/app/_components/layout/mobile/footer";
import LinkItem from "./linkItem";
import { useRouter } from "next/navigation";
import AddPic from "./addPic";

const SettingsMobile = () => {
  const [gender, setGender] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleSave = () => {
    router.push("/profile");
  };
  return (
    <>
      <main className="mt-[128px]  w-screen px-[11.25px] tracking-wider">
        <div className="flex gap-[17.67px] ml-[19.75px] h-[74px]">
          <img className="size-[74px]" src="/image/profile/avatar.png" alt="" />
          <div className=" relative mt-[28px] ">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex justify-center items-center border-[1.07px] border-white  rounded-[3.2px] text-[13px] w-[110.3px] h-[17.4px]"
            >
              EDIT PICTURE
            </button>
            {isOpen && <AddPic setIsOpen={setIsOpen} />}
          </div>
        </div>
        <div className="mt-[21px] flex flex-col gap-[17.2px] justify-between">
          <h1 className="text-[10.32px] font-semibold text-center">
            BASIC INFO
          </h1>
          <InputItem name="username" holderName="Text" />
          <GenderItem setGender={setGender} gender={gender} />
          <InputItem name="bio" holderName="Text" />
        </div>
        <div className="h-[314.15px] flex flex-col gap-[17.2px] mt-[32.1px] mb-[201px]">
          <h1 className="text-[10.32px] font-semibold  flex items-center gap-[8px] justify-center">
            LINKS <img src="/icon/settings/link.png" alt="" />
          </h1>
          <LinkItem name="instagram" holderName="Link" />
          <LinkItem name="tiktok" holderName="Link" />
          <LinkItem name="youtube" holderName="Link" />
          <LinkItem name="linkedin" holderName="Link" />
        </div>
        <button
          onClick={handleSave}
          className="h-[50px] w-[282.8px] bg-blue rounded-[20px] text-[25px] mb-[71px] font-semibold flex items-center justify-center mx-auto"
        >
          SAVE
        </button>
      </main>
      <FooterMobile isFixed={false} />
    </>
  );
};
export default SettingsMobile;
