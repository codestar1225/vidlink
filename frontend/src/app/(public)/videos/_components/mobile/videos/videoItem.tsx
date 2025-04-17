import { Eye } from "lucide-react";
import Link from "next/link";
import ReactPlayer from "react-player";
interface Type {
  userName: string;
  views: number;
  src: string;
  no: number;
  videoId: string;
}
const VideoItem: React.FC<Type> = ({ userName, views, src, no, videoId }) => {
  return (
    <>
      <li className="h-[149.33px] w-[31%] flex flex-col items-center  justify-between">
        <div className="h-[86.48px] w-full rounded-[8.37px] overflow-hidden">
          {src !== "" ? (
            <Link href={`/videos/${videoId}`} className="w-full h-full">
              <ReactPlayer
                url={src}
                // playing
                muted
                loop
                width="100%"
                height="100%"
                progressInterval={1000}
                config={{
                  file: {
                    attributes: {
                      style: {
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      },
                    },
                  },
                }}
              />
            </Link>
          ) : (
            <></>
          )}
        </div>
        <div className="w-[58.6px] h-[43.32px] flex flex-col justify-between items-center">
          <h1 className="text-[7.81px] font-semibold">VIDEO {no}</h1>
          <p className="text-[7.81px] text-[#7C889D] text-center flex flex-col w-full">
            UPLOADED BY
            <span className="leading-none ">{userName.toUpperCase()}</span>
          </p>
          <div className="flex flex-wrap items-center justify-center h-[7.81px] w-full gap-[1.67px]">
            {/* <img className="size-[7.81px]" src="/icon/videos/eye.svg" alt="" /> */}
            <Eye className="size-[7px] text-[#7C889D]"/>
            <p className=" text-[6.7px]  text-[#7C889D] flex items-center pt-[1px]">
              {views >= 10000 ? `${views / 10}K+` : views}
            </p>
          </div>
        </div>
      </li>
    </>
  );
};
export default VideoItem;
