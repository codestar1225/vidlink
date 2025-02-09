import { Trash2 } from "lucide-react";
import { ChangeEvent } from "react";

interface Type {
  validateVideo(value: ChangeEvent<HTMLInputElement>): void;
  cancelVideo(): void;
  error: string;
  videoSrc: string | null;
}
const FileUpload: React.FC<Type> = ({
  validateVideo,
  cancelVideo,
  error,
  videoSrc,
}) => {
  return (
    <>
      <div className="h-[210px] flex justify-center items-center rounded-[10px] bg-[#1E1E1E] mt-[43px] mx-[13.5px] mb-[149px] relative">
        {!error ? (
          <>
            <label
              htmlFor="upload"
              className="h-[75.64px] flex flex-col items-center justify-between mb-[26.36px] "
            >
              {!videoSrc ? (
                <>
                  <div className="h-[50.39px] w-[50.39px] gap-[8px]">
                    <img src="/icon/upload/file.svg" alt="" />
                  </div>
                  <div className="border-[1.5px] border-white rounded-[3.2px] text-[14.91px] pt-[3.2px] pb-[1.3px] px-[2.13px] ">
                    BROWSE FILE
                  </div>
                </>
              ) : (
                <>
                  <img
                    className="mb-[21px] size-[81px]"
                    src="/icon/upload/checked.svg"
                    alt=""
                  />
                </>
              )}
            </label>
          </>
        ) : (
          <div className="h-[114.64px] flex flex-col items-center justify-between">
            <img
              className="size-[50.4px]"
              src="/icon/upload/error.png"
              alt=""
            />
            <div className="flex flex-col justify-between items-center text-[#EA003B] font-semibold h-[50px]">
              <span className="text-[14.53px] ">ERROR</span>
              <p className="text-center text-[12px] w-[225px] leading-[14.4px]">
                {/* An error occurred: the file may be too large or exceed the
                allowed duration. */}
                {error}
              </p>
            </div>
          </div>
        )}
        <input
          className=" hidden"
          id="upload"
          type="file"
          accept="video/mp4, video/mov, video/wmv, video/flv, video/avi"
          onChange={(e) => {
            validateVideo(e);
            e.target.value = "";
          }}
        />
        {(videoSrc || error) && (
          <button onClick={cancelVideo} className="absolute right-3 top-3">
            <Trash2 />
          </button>
        )}
      </div>
    </>
  );
};
export default FileUpload;
