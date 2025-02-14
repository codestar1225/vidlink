import { Video } from "@/app/_components/ui/video";
import Link from "next/link";

interface Type {
  editor: string;
  review: number;
  src: string;
}
const Videos = ({ video }: { video: Type[] }) => {
  return (
    <>
      <ul className="gap-x-[11px] gap-y-[15px] flex flex-wrap justify-center items-start h-[596.98px] overflow-hidden ">
        {video.slice(0, 18).map((item, index) => (
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
    </>
  );
};
export default Videos;
