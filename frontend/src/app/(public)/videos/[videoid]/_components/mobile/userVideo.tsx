import { Video } from "@/app/_components/ui/video";
import videos from "../../../_components/mobile/videos1.json";
const UserVideo = () => {
  return (
    <>
      <div className=" px-[11px]">
        <h1 className="text-[12px] pb-[11px]">
          <span className="text-[#0068FF]">MORE OF</span>&nbsp;- USERNAME
        </h1>
        <ul className=" overflow-hidden h-[189.5px] gap-x-[11px] gap-y-[15px] flex flex-wrap justify-center items-start">
          {videos.map((item, index) => (
            <li
              className="w-[118.43px] h-[86.48px] rounded-[8.37px] overflow-hidden "
              key={index}
            >
              <Video src={item.src} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
export default UserVideo;
