import Link from "next/link";
import { VideoType } from "../../../page";
import VideoItem from "../videos/videoItem";

interface Type {
  myLikesVideos: VideoType[];
}
const Likes: React.FC<Type> = ({ myLikesVideos }) => {
  return (
    <>
      <ul className="overflow-hidden gap-[11px] flex flex-wrap justify-center items-start mt-[48px]">
        {myLikesVideos?.slice(0, 12)?.map((item, index) => (
          <Link key={index} href={`/videos/${item._id}`}>
            <VideoItem videoLink={item.videoLink} />
          </Link>
        ))}
      </ul>
    </>
  );
};
export default Likes;
