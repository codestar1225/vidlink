const ProgressLine = () => {
  return (
    <>
      <div className="mx-[24px] h-[37px] relative tracking-[2px] mt-[112px]">
        <div className="bg-[#505050] w-full h-[5px] rounded-full absolute bottom-[7px]"></div>
        <img
          className=" absolute left-[26px] -bottom-[0.5px]"
          src="/icon/upload/point_white.svg"
          alt=""
        />
        <img
          className=" absolute left-[50%] bottom-[0px] -translate-x-[50%]"
          src="/icon/upload/point_gray.svg"
          alt=""
        />
        <img
          className=" absolute right-[26px] bottom-[0px]"
          src="/icon/upload/point_gray.svg"
          alt=""
        />
        <div className="text-[8px] font-semibold tracking-widest absolute left-[15px] bottom-[30px]">
          UPLOAD
        </div>
        <div className="text-[8px] text-[#505050] font-semibold tracking-widest absolute left-[50%] -translate-x-[50%] bottom-[30px]">
          ADD CARDS
        </div>
        <div className="text-[8px] text-[#505050] font-semibold tracking-widest absolute right-[15px] bottom-[30px]">
          PUBLISH
        </div>
      </div>
    </>
  );
};
export default ProgressLine;
