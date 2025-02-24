import { Video } from "@/app/_components/ui/video";
import Link from "next/link";
import { VideoType } from "../../../page";
import ReactPlayer from "react-player";

interface Type {
  userVideos: VideoType[];
  userName: string;
}
const UserVideo: React.FC<Type> = ({ userVideos, userName }) => {
  return (
    <>
      <div className=" px-[11px]">
        <h1 className="text-[12px] pb-[11px]">
          <span className="text-blue">MORE OF</span>&nbsp;-{" "}
          {userName.toUpperCase()}
        </h1>
        <ul className=" overflow-hidden h-[189.5px] gap-x-[11px] gap-y-[15px] flex flex-wrap justify-center items-start">
          {userVideos.map((item, index) => (
            <li
              className="w-[118.43px] h-[86.48px] rounded-[8.37px] overflow-hidden "
              key={index}
            >
              <div className="w-full bg-[#27272798] h-[86.48px] rounded-[8.37px] overflow-hidden relative">
                {item.videoLink !== "" ? (
                  <Link href={`/videos/${item._id}`} className="w-full h-full">
                    <ReactPlayer
                      url={item.videoLink}
                      playing
                      muted
                      loop
                      width="100%"
                      height="100%"
                      progressInterval={1000}
                    />
                  </Link>
                ) : (
                  <></>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
export default UserVideo;
