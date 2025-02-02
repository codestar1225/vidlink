import { Video } from "@/app/_components/ui/video";
import videos2 from "../../../_components/mobile/videos2.json";
import Link from "next/link";
const RelatedVideo = () => {
  return (
    <>
      <div className=" px-[11px] pt-[41.5px]">
        <h1 className="text-[12px] pb-[11px]">RELATED VIDEOS</h1>
        <ul className=" overflow-hidden h-[189.5px] gap-x-[11px] gap-y-[15px] flex flex-wrap justify-center items-start">
          {videos2.map((item, index) => (
            <li
              className="w-[118.43px] h-[86.48px] rounded-[8.37px] overflow-hidden "
              key={index}
            >
              <Link href={`/videos/${index}`}>
                <Video src={item.src} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
export default RelatedVideo;
