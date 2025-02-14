import { Video } from "@/app/_components/ui/video";
import Link from "next/link";
import { VideoType } from "../../../page";
interface Type {
  relatedVideos: VideoType[];
}
const RelatedVideo: React.FC<Type> = ({ relatedVideos }) => {
  return (
    <>
      <div className=" px-[11px] pt-[41.5px]">
        <h1 className="text-[12px] pb-[11px]">RELATED VIDEOS</h1>
        <ul className=" overflow-hidden h-[189.5px] gap-x-[11px] gap-y-[15px] flex flex-wrap justify-center items-start">
          {relatedVideos.map((item, index) => (
            <li
              className="w-[118.43px] h-[86.48px] rounded-[8.37px] overflow-hidden "
              key={index}
            >
              <Link href={`/videos/${item._id}`}>
                <Video src={item.videoLink} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
export default RelatedVideo;
