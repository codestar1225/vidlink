import Footer from "@/components/layout/mobile/footer";
import Card from "@/components/ui/card";
import CardNext from "@/components/ui/cardNext";
import UserVideo from "./userVideo";
import RelatedVideo from "./relatedVideo";
import Link from "next/link";

const VideoMobile = ({ id }: { id: string }) => {
  return (
    <>
      <div className="min-h-screen pt-[84px] pb-[50px] w-svw flex flex-col items-center">
        {/* title */}
        <div className="flex justify-between items-center px-[15px] w-full pb-[10px]">
          <h1 className="text-[14px] font-semibold ">
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
        <div className="relative rounded-[7.36px] overflow-hidden">
          <img src="/image/detail/man.svg" alt="" />
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
        <div className="flex justify-center w-full px-[10px]">
          <ul className="flex gap-[6px] justify-start w-full">
            <CardNext />
            <Card />
          </ul>
        </div>
      </div>
      <UserVideo />
      <RelatedVideo />
      <div className="w-svw flex justify-center">
        <Link
          href={"/videos"}
          className="border-[1.5px] dark:border-white border-black rounded-[3.2px] text-[14.91px] pt-[3.2px] pb-[1.5px] px-[2.13px] mt-[94.5px] mb-[132.6px]"
        >
          ALL VIDEOS
        </Link>
      </div>
      <Footer isFixed={true} />
    </>
  );
};
export default VideoMobile;
