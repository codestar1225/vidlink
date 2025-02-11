import { Videos } from "..";
import VideoItem from "./videoItem";
interface Type {
  videos: Videos[];
}
const Index: React.FC<Type> = ({ videos }) => {
  return (
    <>
      <ul className=" gap-x-[11px] gap-y-[15px] flex flex-wrap justify-center items-start">
        {videos.map((item, index) => (
          <VideoItem
            name={item.editor}
            review={item.review}
            src={item.src}
            no={index + 1}
            key={index}
          />
        ))}
      </ul>
    </>
  );
};
export default Index;
