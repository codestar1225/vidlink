import Link from "next/link";
import { VideoType } from "../../../page";
import VideoItem from "./videoItem";

interface Type {
  myVideos: VideoType[];
  totalVideos?: number|null;
}
const Videos: React.FC<Type> = ({ myVideos, totalVideos }) => {
  return (
    <>
      <div className="flex justify-between items-center text-[8px] mx-[11px] mt-[24px] mb-[14px] font-semibold tracking-wider">
        <div className="flex gap-[7px] ">
          <span>{totalVideos||0}&nbsp;VIDEOS</span>
          <img className="size-[10px]" src="/icon/profile/video.png" alt="" />
        </div>
        <div className="flex gap-[7px]">
          <span>NEWEST</span>
          <img className="size-[10px]" src="/icon/profile/arrow.png" alt="" />
        </div>
      </div>
      <ul className="gap-x-[11px] gap-y-[15px] flex flex-wrap justify-center items-start  ">
        {myVideos?.slice(0, 18)?.map((item, index) => (
          <Link href={`/videos/${item._id}`} key={index}>
            <VideoItem videoLink={item.videoLink} />
          </Link>
        ))}
      </ul>
    </>
  );
};
export default Videos;
