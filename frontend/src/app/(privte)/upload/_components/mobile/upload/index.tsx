import FooterMobile from "@/app/_components/layout/mobile/footer";
import ProgressLine from "./progressLine";
import { ChangeEvent } from "react";

interface Type {
  fileName: string;
  handleUpload(value: ChangeEvent<any>): void;
  setIsUpload(value: boolean): void;
}
const Upload: React.FC<Type> = ({ fileName, handleUpload, setIsUpload }) => {
  return (
    <>
      <main className="w-screen">
        <div className="mx-[19.5px] h-[51px] flex flex-col justify-between mt-[29px] relative">
          <div className="flex items-center gap-[7px]">
            <div className="text-[8px] font-semibold h-[7px] mb-[1.8px] ">
              LINK
            </div>
            <button>
              <img src="/icon/upload/paste.svg" alt="" />
            </button>
          </div>
          <input
            type="text"
            placeholder="Paste link here"
            className="h-[34px] w-full bg-[#1E1E1E] border-[2.72px] border-[#505050] rounded-[9px] placeholder:text-[10px] placeholder:text-[#505050] placeholder:font-semibold px-[9px]"
          />
          <span className="text-[9px] font-semibold absolute -bottom-[26px] left-[50%] translate-x-[50%]">
            OR
          </span>
        </div>
        <div className="h-[210px] flex justify-center items-center rounded-[10px] bg-[#1E1E1E] mt-[43px] mx-[13.5px]">
          <label
            htmlFor="upload"
            className="h-[75.64px] flex flex-col items-center mb-[26.36px] gap-[8px]"
          >
            {!fileName ? (
              <img src="/icon/upload/file.svg" alt="" />
            ) : (
              <>
                <img
                  className="mb-[21px]"
                  src="/icon/upload/checked.svg"
                  alt=""
                />
              </>
            )}
            <div className="border-[1.5px] border-white rounded-[3.2px] text-[14.91px] pt-[3.2px] pb-[1.3px] px-[2.13px] mb-[149px]">
              BROWSE FILE
            </div>
          </label>

          <input
            className=" hidden"
            id="upload"
            type="file"
            onChange={(e) => {
              handleUpload(e);
            }}
          />
        </div>
        <div className="text-[9px] font-normal tracking-widest h-[67px] flex flex-col items-center mt-[34px] justify-between">
          <p>
            MAX FILE SIZE <span className="font-semibold">50MB</span>. MAX{" "}
            <span className="font-semibold">4 MINUTES FILE.</span>
          </p>
          <p className="mb-[12px]">
            FORMAT <span className="font-bold">MP4</span> /{" "}
            <span className="font-bold">MOV</span> /{" "}
            <span className="font-bold">WMV</span> /{" "}
            <span className="font-bold">FLV</span> /{" "}
            <span className="font-bold">AVI</span>.
          </p>
          <p>YOUR VIDEOS WILL BE PRIVATE UNTIL YOU PUBLISH THEM.</p>
        </div>
        <button
          onClick={() => {
            if (fileName) {
              setIsUpload(true);
            }
            return;
          }}
          className={` ${
            fileName ? "bg-[#0068FF]" : "bg-[#1E1E1E]"
          } w-[282.81px] h-[50px] flex justify-center rounded-[20px] items-center gap-[10px] mx-auto mt-[88px]  mb-[60px]`}
        >
          <div className="font-semibold text-black text-[21px]">NEXT</div>
          <img className="size-[18px]" src="/icon/upload/arrow.svg" alt="" />
        </button>
        <FooterMobile isFixed={true} />
      </main>
    </>
  );
};
export default Upload;
