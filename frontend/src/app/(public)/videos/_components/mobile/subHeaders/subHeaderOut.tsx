import { basicBold } from "@/style/fonts/fonts";

const SubHeaderOut = () => {
  return (
    <>
      <header className="mt-[121px] flex flex-col items-center gap-[16px] mx-[22px]">
        <h1 className={`${basicBold.className} text-[48px]`}>ALL VIDEOS</h1>
        <i className="text-[10px] font-normal">
          Log in to view the content from the people you follow.
        </i>
        <input
          className="w-full h-[27px] text-[12px] rounded-[20px] border border-[#777777] outline-offset-1 px-[12px] py-[5.4px] mb-[20.5px] placeholder-[#5B5B5B]"
          type="search"
          placeholder="SEARCH..."
        />
      </header>
    </>
  );
};
export default SubHeaderOut;
