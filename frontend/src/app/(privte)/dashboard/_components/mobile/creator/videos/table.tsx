"use client";
import Image from "next/image";
import { useState } from "react";

const Table = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <>
      <div
        className={`${
          isOpen
            ? "max-h-[413px] overflow-scroll"
            : "max-h-[63.8px] overflow-hidden"
        } font-semibold bg-[#191919] rounded-[8px] px-[11px] py-[16px]  duration-500`}
      >
        <h1 className="font-semibold text-[10px] w-full text-center">
          LIST OF VIDEOS
        </h1>
        <button onClick={() => setIsOpen(!isOpen)} className="w-full">
          <img
            src="/icon/dashboard/arrow.png"
            className={`${
              isOpen ? "rotate-0" : "rotate-180"
            } duration-300 size-[18.53px] mx-auto mt-[6px]`}
            alt=""
          />
        </button>
        <table className="font-semibold">
          <thead className="text-[8px]">
            <tr className="border-b-[0.5px] h-[31px]">
              <th className="text-left">
                <i>VIDEO</i>
              </th>
              <th className="w-[14%]">
                <div className="flex gap-[5.23px] items-center justify-center">
                  <Image
                    width={7.77}
                    height={7.77}
                    src="/icon/dashboard/views.png"
                    alt=""
                  />
                  <i>VIEWS</i>
                </div>
              </th>
              <th className="w-[14%]">
                <div className="flex gap-[5.23px] items-center justify-center">
                  <Image
                    width={7.77}
                    height={7.77}
                    src="/icon/dashboard/likes.png"
                    alt=""
                  />
                  <i>LIKES</i>
                </div>
              </th>
              <th className="w-[14%] ">
                <div className="flex gap-[5.23px] items-center justify-center">
                  <Image
                    width={7.77}
                    height={7.77}
                    src="/icon/dashboard/cards.png"
                    alt=""
                  />
                  <i>CARDS</i>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="text-[10px]">
            <tr className="border-b-[0.5px] h-[19.8px]">
              <td>WHERE SHE GOES</td>
              <td className="w-[14%]">
                <div className="flex gap-[5.23px] items-center justify-center">
                  <Image
                    width={7.77}
                    height={7.77}
                    src="/icon/dashboard/views.png"
                    alt=""
                  />
                  85.5K
                </div>
              </td>
              <td className="w-[14%]">
                <div className="flex gap-[5.23px] items-center justify-center">
                  <Image
                    width={7.77}
                    height={7.77}
                    src="/icon/dashboard/likes.png"
                    alt=""
                  />
                  2696
                </div>
              </td>
              <td className="w-[14%]">
                <div className="flex gap-[5.23px] items-center justify-center">
                  <Image
                    width={7.77}
                    height={7.77}
                    src="/icon/dashboard/cards.png"
                    alt=""
                  />
                  2334
                </div>
              </td>
            </tr>
            <tr className="border-b-[0.5px] h-[19.8px]">
              <td>WHERE SHE GOES</td>
              <td className="w-[14%]">
                <div className="flex gap-[5.23px] items-center justify-center">
                  <Image
                    width={7.77}
                    height={7.77}
                    src="/icon/dashboard/views.png"
                    alt=""
                  />
                  85.5K
                </div>
              </td>
              <td className="w-[14%]">
                <div className="flex gap-[5.23px] items-center justify-center">
                  <Image
                    width={7.77}
                    height={7.77}
                    src="/icon/dashboard/likes.png"
                    alt=""
                  />
                  2696
                </div>
              </td>
              <td className="w-[14%]">
                <div className="flex gap-[5.23px] items-center justify-center">
                  <Image
                    width={7.77}
                    height={7.77}
                    src="/icon/dashboard/cards.png"
                    alt=""
                  />
                  2334
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
export default Table;
