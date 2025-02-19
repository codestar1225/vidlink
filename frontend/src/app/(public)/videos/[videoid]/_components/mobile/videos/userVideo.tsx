import { Video } from "@/app/_components/ui/video";
import Link from "next/link";
import { VideoType } from "../../../page";

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
export default UserVideo;
