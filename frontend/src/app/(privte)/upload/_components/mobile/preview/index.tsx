import Footer from "@/app/_components/layout/mobile/footer";
import cards from "../addCards/cards.json";
import { useState } from "react";
import Card from "../addCards/card";

interface Type {
  setIsAdd(value:boolean):void
}
const Preview:React.FC<Type> = ({setIsAdd}) => {
  const [isEditing, setIsEditing] = useState<string>("LOCATION");
  return (
    <>
      <div className="mt-[69px] w-svw flex flex-col items-center">
        {/* title */}
        <div className="flex justify-between items-center px-[15px] w-full pb-[10px]">
          <h1 className="text-[14px] font-normal ">
            <span className="text-[#0068FF]">WHERE SHE GOES</span>
            &nbsp;- BAD BUNNY
          </h1>
          <div className="flex gap-[13px] items-center">
            <button>
              <img src="/icon/detail/heart.svg" alt="" />
            </button>
            <button>
              <img src="/icon/detail/forward.svg" alt="" />
            </button>
          </div>
        </div>
        {/* image */}
        <div className="relative rounded-[7.36px] h-[225.42px] w-full overflow-hidden">
          <img src="/image/upload/bg.png" alt="" className=" object-cover" />
          <div className=" absolute"></div>
        </div>
        {/* detail */}
        <div className="h-[72.58px] w-full relative flex items-center justify-center">
          <div className="absolute top-[18.6px] left-[11px] flex gap-[10.3px] items-start">
            <img src="/icon/detail/avatar.svg" alt="" />
            <div className="flex flex-col h-[38.3px] justify-between items-start">
              <div className="text-[12px] text-[#0068FF] font-semibold ">
                USERNAME
              </div>
              <div className="text-[8px] font-normal ">227 VIDEOS</div>
              <div className="text-[8px] font-semibold border-[0.41px] rounded-[1.24px] px-[0.82px]">
                FOLLOW
              </div>
            </div>
          </div>
          <button className=" pl-[12px] pt-[4px]">
            <img src="/icon/detail/heart.svg" alt="" />
          </button>
          <div className=" absolute right-[9.23px] top-[10.6px] flex gap-[12px]">
            <div className="flex flex-col items-center gap-[5px]">
              <h1 className="text-[8px] font-semibold">CARDS</h1>
              <button className="border-[1.43px] w-[43px] h-[34px] rounded-[4.76px] text-center">
                12
              </button>
            </div>
            <div className="flex flex-col items-center gap-[5px]">
              <h1 className="text-[8px] font-semibold">SUGGEST</h1>
              <button className="border-[1.43px] w-[43px] h-[34px] rounded-[4.76px] flex justify-center items-center">
                <img src="/icon/detail/card/plus.svg" alt="" />
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center  px-[10px]">
          <ul className="flex flex-wrap justify-start content-start max-[401px]:justify-center gap-[6px] h-[391.7px] max-w-[380px]">
            {cards.map((item, index) => (
              <Card
                key={index}
                setIsEditing={setIsEditing}
                isEditing={isEditing}
                name={item.name}
                src={item.src}
              />
            ))}
          </ul>
        </div>
      </div>
      <div className="">
        <button
          onClick={() => setIsAdd(false)}
          className="w-[282.8px] h-[50px] border-[3px] text-[21.5px] font-semibold rounded-[20px] mx-auto flex justify-center items-center mt-[63.4px] mb-[23px] tracking-wider"
        >
          EDIT
        </button>
        <button
          className="w-[282.8px] h-[50px] text-[21.5px] font-semibold rounded-[20px] bg-[#0068FF] mx-auto flex justify-center items-center mb-[56px] tracking-wider"
        >
          PUBLISH
        </button>
      </div>
      <Footer isFixed={false} />
    </>
  );
};
export default Preview;
