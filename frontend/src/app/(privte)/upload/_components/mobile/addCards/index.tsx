"use client";
import images from "../image.json";
import Customize from "./customize";
import Cards from "./cards";
import FooterMobile from "@/app/_components/layout/mobile/footer";
import { ChangeEvent, useState } from "react";
import Image from "next/image";

interface Type {
  isAdd: boolean;
  setIsAdd(value: boolean): void;
}

const AddCards: React.FC<Type> = ({ isAdd, setIsAdd }) => {
  const [fileUrl, setFileUrl] = useState<string>("");

  function handleUpload(e: ChangeEvent<any>) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFileUrl(reader.result as string); // Base64 URL of the image
      };
      reader.readAsDataURL(file);
    }
  }
  return (
    <>
      <main className="w-screen">
        <div className="h-[280.51px] text-[9px] tracking-[2px] font-semibold mx-[19.5px] mt-[37px] flex flex-col justify-between">
          <h1 className="h-[9px] text-center">VIDEO SETTINGS</h1>
          <div className="h-[59px] flex flex-col justify-between">
            <h1>TITLE</h1>
            <input
              type="text"
              placeholder="Text"
              className="h-[40px] font-normal text-[18px] py-[15px] w-full bg-[#1E1E1E] border-[2.72px] border-[#505050] rounded-[9px] placeholder:text-[12px] placeholder:text-[#505050] placeholder:font-semibold px-[9px]"
            />
          </div>
          <div className="h-[86.51px] flex flex-col justify-between">
            <h1>THUMBNAIL</h1>
            <div className="h-[62.51px] flex rounded-[13.6px] overflow-hidden">
              {images.map((item, index) => (
                <img
                  className="w-1/12 h-full object-cover"
                  src={item.src}
                  alt=""
                  key={index}
                />
              ))}
            </div>
          </div>
          <div className="h-[81px] flex justify-between items-center">
            <div className="w-[110px] h-full flex flex-col justify-between items-center">
              <h1>PREVIEW FRAME</h1>
              <img
                className="h-[62px] w-full"
                src="/image/upload/vid2.svg"
                alt=""
              />
            </div>
            <div>OR</div>
            <div className="w-[110px] h-full flex flex-col justify-between items-center ">
              <h1>CUSTOM</h1>
              <label
                htmlFor="upload"
                className="flex justify-center items-center h-[62px] w-full rounded-[9.1px] overflow-hidden bg-[#191919]"
              >
                <img
                  className={fileUrl ? "h-[62px] w-full object-cover" : ""}
                  src={fileUrl ? fileUrl : "/icon/upload/image.svg"}
                  alt=""
                />
              </label>
              <input
                onChange={(e) => handleUpload(e)}
                type="file"
                className=" hidden"
                id="upload"
              />
            </div>
          </div>
        </div>
        <Customize />
        <Cards />
        <button
          onClick={() => setIsAdd(true)}
          className="w-[309px] h-[50px] text-[21.5px] font-semibold rounded-[16px] bg-blue mx-auto flex justify-center items-center mt-[57px] mb-[65px] tracking-wider"
        >
          PREVIEW & PUBLISH
        </button>
      </main>
      <FooterMobile isFixed={false} />
    </>
  );
};
export default AddCards;
