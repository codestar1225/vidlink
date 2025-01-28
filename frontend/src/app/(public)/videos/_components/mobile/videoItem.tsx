import { Video } from "@/app/_components/ui/video";
import Link from "next/link";
interface Type {
  name: string;
  review: number;
  src: string;
  no: number;
}
const VideoItem: React.FC<Type> = ({ name, review, src, no }) => {
  return (
    <>
      <li className="h-[149.33px] w-[117.73px] flex flex-col items-center  justify-between">
        <div className="w-full h-[86.48px] rounded-[8.37px] overflow-hidden ">         
            <Video src={src} />      
        </div>
        <div className="w-[58.6px] h-[43.32px] flex flex-col justify-between items-center">
          <h1 className="text-[7.81px] font-semibold">VIDEO {no}</h1>
          <p className="text-[7.81px] text-[#7C889D] text-center">
            UPLOADED BY
            <span>{name}</span>
          </p>
          <div className="  flex flex-wrap items-center justify-center h-[7.81px] w-full gap-[1.67px]">
            <img src="/icon/videos/eye.svg" alt="" />
            <p className=" text-[6.7px] text-[#7C889D]">{review}</p>
          </div>
        </div>
      </li>
    </>
  );
};
export default VideoItem;
