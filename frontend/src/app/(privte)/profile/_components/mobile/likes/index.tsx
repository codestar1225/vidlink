import { Video } from "@/app/_components/ui/video";
import Link from "next/link";

interface Type {
  editor: string;
  review: number;
  src: string;
}
const Likes = ({ videos }: { videos: Type[] }) => {
  return (
    <>
      <ul className="overflow-hidden gap-[11px] flex flex-wrap justify-center items-start ">
        {videos.slice(0, 12).map((item, index) => (
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
export default Likes;
