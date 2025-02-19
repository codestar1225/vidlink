import Card from "./card";
import { VideoType } from "../../../page";
interface Type {
  myVideos: VideoType[];
  userName?: string | null;
}
const Cards: React.FC<Type> = ({ myVideos, userName }) => {
  return (
    <>
      <div className="flex justify-center">
        <div className="text-[14px] font-normal flex flex-col gap-[15px] w-[379.1px] max-[401px]:w-[251px] mt-[48px]">
          {myVideos?.map((item, index) => (
            <div key={index}>
              <h1>
                <span className=" text-blue font-semibold ">
                  {item.title && item.title.toUpperCase()}
                </span>{" "}
                - {userName || ""}
              </h1>
              <ul className="flex flex-wrap justify-start gap-x-[5.9px] gap-y-[7.24px] mt-[13px]">
                {item.cards?.slice(0, 5)?.map((item, index) => (
                  <Card
                    name={item.name}
                    link={item.link}
                    icon={item.icon}
                    isSaved={item.isSaved}
                    start={item.start}
                    no={index + 1}
                    key={index}
                  />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Cards;
