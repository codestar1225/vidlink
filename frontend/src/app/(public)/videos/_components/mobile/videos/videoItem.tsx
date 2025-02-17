import Link from "next/link";
import ReactPlayer from "react-player";
interface Type {
  userName: string;
  review: number;
  src: string;
  no: number;
  videoId: string;
}
const VideoItem: React.FC<Type> = ({ userName, review, src, no, videoId }) => {
  return (
    <>
      <li className="h-[149.33px] w-[117.73px] flex flex-col items-center  justify-between">
        <div className="w-full bg-[#27272798] h-[86.48px] rounded-[8.37px] overflow-hidden relative">
          {src !== "" ? (
            <Link href={`/videos/${videoId}`} className="w-full h-full">
              <ReactPlayer
                url={src}
                playing
                muted
                loop
                width="100%"
                height="100%"
              />
            </Link>
          ) : (
            <></>
          )}
        </div>
        <div className="w-[58.6px] h-[43.32px] flex flex-col justify-between items-center">
          <h1 className="text-[7.81px] font-semibold">VIDEO {no}</h1>
          <p className="text-[7.81px] text-[#7C889D] text-center flex flex-col">
            UPLOADED BY
            <span>{userName}</span>
          </p>
          <div className="flex flex-wrap items-center justify-center h-[7.81px] w-full gap-[1.67px]">
            <img className="size-[7.81px]" src="/icon/videos/eye.svg" alt="" />
            <p className=" text-[6.7px]  text-[#7C889D] flex items-center pt-[1px]">{review}</p>
          </div>
        </div>
      </li>
    </>
  );
};
export default VideoItem;
