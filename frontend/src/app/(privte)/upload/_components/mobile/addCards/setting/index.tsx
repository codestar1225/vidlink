import { setItem } from "@/utils/localstorage";
import { ChangeEvent } from "react";

interface Type {
  setTitle(value: string): void;
  title: string;
}
const Index: React.FC<Type> = ({ setTitle, title }) => {
  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setTitle(title);
    setItem("title", title);
  };
  return (
    <>
      <div className=" text-[9px] tracking-[2px] font-semibold mx-[19.5px] mt-[37px] flex flex-col justify-between">
        <h1 className="text-[32px]  text-center">VIDEO</h1>
        <div className="h-[59px] flex flex-col justify-between">
          <h1>TITLE</h1>
          <input
            value={title}
            onChange={handleTitle}
            type="text"
            placeholder="Text"
            className="h-[40px] font-normal text-[14px] py-[15px] w-full bg-[#1E1E1E] border-[2.72px] border-[#505050] rounded-[9px] placeholder:text-[12px] placeholder:text-[#505050] placeholder:font-semibold px-[9px]"
          />
        </div>
        {/* <Thumbnail images={images} />
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
                className={imgFile ? "h-[62px] w-full object-cover" : ""}
                src={imgFile ? imgFile : "/icon/upload/image.svg"}
                alt=""
              />
            </label>
            <input
              onChange={(e) => handleUploadImg(e)}
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/gif, image/webp, image/svg+xml, image/bmp"
              className=" hidden"
              id="upload"
            />
          </div>
        </div> */}
      </div>
    </>
  );
};
export default Index;
