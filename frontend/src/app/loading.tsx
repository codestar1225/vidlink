import HeaderMobile from "./_components/layout/mobile/header";

export default function Loading() {
  return (
    <>
      <HeaderMobile />
      <div className="h-screen w-screen flex justify-center items-center ">
        <span className="border-[3px] size-[30px] border-l-black rounded-full animate-spin"></span>
      </div>
    </>
  );
}
