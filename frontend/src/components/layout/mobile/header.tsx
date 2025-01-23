import Link from "next/link";

const Header = () => {
  return (
    <>
      <header className="fixed top-0 left-0 w-svw z-10">
        <div className="flex justify-between mt-[30px] bg-transparent mx-[32px]">
          <Link href={"/menu"}>
            <img src="/icon/layout/menu.svg" alt="" />
          </Link>
          <div className="flex gap-[9px]">
            <Link href={"/message"}>
              <img src="/icon/layout/message.svg" alt="" />
            </Link>
            <Link href={"/profile"}>
              <img src="/icon/layout/avatar.svg" alt="" />
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};
export default Header;
