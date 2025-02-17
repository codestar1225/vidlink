import ReactPlayer from "react-player";
interface Type {
  videoLink: string;
}
const VideoItem: React.FC<Type> = ({ videoLink}) => {
  return (
    <>
      <li className="w-[118.43px] bg-[#27272798] relative h-[86.48px] rounded-[8.37px] overflow-hidden">
        {videoLink !== "" ? (
            <ReactPlayer
              url={videoLink}
              playing
              muted
              loop
              width="100%"
              height="100%"
            />  
        ) : (
          <></>
        )}
      </li>
    </>
  );
};
export default VideoItem;
