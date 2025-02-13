import { Video } from "../../../page";
import VideoItem from "./videoItem";
interface Type {
  videos: Video[];
}
const Index: React.FC<Type> = ({ videos }) => {
  return (
    <>
      <ul className=" gap-x-[11px] gap-y-[15px] flex flex-wrap justify-center items-start">
        {videos.map((item, index) => (
          <VideoItem
            username={item.user.username}
            review={item.totalView}
            src={item.videoLink}
            no={index + 1}
            key={index}
            videoId={item._id}
          />
        ))}
      </ul>
    </>
  );
};
export default Index;
