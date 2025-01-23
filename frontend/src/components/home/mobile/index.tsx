"use client";
import { Video } from "./video";
import Link from "next/link";
import { basicBold } from "@/style/fonts/fonts";
import { useTheme } from "next-themes";
import Footer from "@/components/layout/mobile/footer";

export default function HomeMobile() {
  return (
    <>
      <div className=" relative">
        <Video src="https://s3-figma-videos-production-sig.figma.com/video/TEAM/1393144935889806437/21ccd5fbb587ece024aabb6db8830cd85bb7a8f0?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Oymt56DcqCqtmiMbL8xH5XpbPkzBiB0THOeL5Z~nieE~CYDpsxvM1FjMT~HIKgkK70CbrtW~C5wgdKJzRzyFXnMLAhvhcXrJeTd47FXIt5STcOeKTFg5qPx~5rek2dQAYs5MMGzOSpXDg2GWLa2NYcSCUjZVdo6g2ZN71ROHHlH5HnHc1YKbddDMmB-VJJSFhs2XR3~ANTsGJGzjgMeXwcyA1hOnz-FnhYlVAMZHJWAxs2IalLknURlO-g8HaGsSZYxrLpSSenDOoTrRnS7KdT66jIbCpRYRk9iTJttqjpy0zmdrNcNXg~v4xfNLq7OnhPcZW00y3WLBmfzbyRKOPg__" />
        <div className="absolute top-[332px] w-full flex justify-center items-centers">
          <div>
            <img src="/icon/home/title.svg" alt="" />
            <div className="flex items-center gap-[12.87px] mt-[13px] pl-[17.54px]">
              <h1 className="text-[15.06px] text-white">
                CONNECT YOUR VIDEOS TO
              </h1>
              <Link href={""}>
                <img src="/icon/home/youtube.svg" alt="" />
              </Link>
            </div>
          </div>
        </div>
        <div className=" absolute text-[10px] bottom-[37px] left-[23px] right-[23px]">
          <h1 className="mb-[15.5px] font-bold ">POWERED BY HUMANS</h1>
          <p className="font-normal leading-[12px]">
            WE FILL VIDEOS WITH KNOWLEDGE AND ACTIONS THANKS TO OUR SYNCHRONIZED
            CARDS. MADE FOR MOVIE LOVERS, DESIGN AFICIONADOS, ADVERTISING PROS,
            SPORTS ANALYTICS AND FANS OF CASABLANCA...
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center w-screen pt-[22px] px-[15.5px]">
        <h1
          className={`${basicBold.className} text-[94.5px] w-full text-center max-[393px]:text-[82px]  leading-[85.39px] pb-[28px]`}
        >
          HOW IT WORKS
        </h1>
        <p className="flex justify-center items-center border-black dark:border-white border-[2px] rounded-[9.42px] w-full h-[574px]">
          <img className="dark:hidden" src="/icon/home/play_dark.svg" alt="" />
          <img className="dark:block hidden" src="/icon/home/play.svg" alt="" />
        </p>
        <p className="text-[12px] w-full pt-[21px] px-[5px] text-justify leading-[14.4px]">
          A tool that allows you to insert content into your favorite videos.
          Thanks to its non intrusive design you can watch and interact or not.
          It is easy, clear and a bit surprising. The system is absolutely safe
          and spam free. Our team of editors curates the content and make sure
          you don’t click where you should not.
        </p>
        <Link
          href={""}
          className="border-[1.5px] dark:border-white border-black rounded-[3.2px] text-[14.91px] pt-[3.2px] pb-[1.5px] px-[2.13px] my-[43px] "
        >
          ALL VIDEOS
        </Link>
      </div>
      <Footer isFixed={false} />
    </>
  );
}
