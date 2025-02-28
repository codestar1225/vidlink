import Link from "next/link";

const FooterMobile = ({ isFixed }: { isFixed: boolean }) => {
  return (
    <>
      <footer
        className={`${
          isFixed && "fixed  bottom-0 left-0 right-0"
        } flex justify-between items-center pt-[9.28px] pb-[8.28px] px-[23px] text-white bg-blue z-50`}
      >
        <div className="flex flex-col items-start gap-[3px]">
          <div className="flex gap-[10px] items-center">
            <Link href={"/menu"}>
              <img src="/icon/layout/instagram.svg" alt="" />
            </Link>
            <Link href={"/message"}>
              <img src="/icon/layout/tiktok.svg" alt="" />
            </Link>
          </div>
          <p className="text-[6px]">TERMS & CONDITIONS</p>
        </div>
        <div className="flex flex-col items-center">
          <Link href={"/"}>
            <img src="/icon/layout/title.svg" alt="" />
          </Link>
          <p className="text-[7px]">A TOOL BY FALCA</p>
        </div>
        <div className="flex flex-col items-end gap-[3px]">
          <div className="flex gap-[10px] items-center">
            <Link href={"/menu"}>
              <img src="/icon/layout/x.svg" alt="" />
            </Link>
            <Link href={"/message"}>
              <img src="/icon/layout/youtu.svg" alt="" />
            </Link>
          </div>
          <p className="text-[6px]">TERMS & CONDITIONS</p>
        </div>
      </footer>
    </>
  );
};
export default FooterMobile;
