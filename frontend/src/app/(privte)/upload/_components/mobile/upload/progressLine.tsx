interface Type {
  isUpload: boolean;
  fileName: string;
  isAdd: boolean;
}
const ProgressLine: React.FC<Type> = ({ isUpload, fileName, isAdd }) => {
  return (
    <>
      <div className="mx-[24px] h-[37px] relative tracking-[2px] mt-[112px]">
        <span className="bg-[#505050] w-full h-[5px] rounded-full absolute bottom-[7px]"></span>
        {/* bar */}
        <span className="bg-blue w-[36px] h-[5px] rounded-full absolute bottom-[7px] left-0"></span>
        <span
          className={`${
            isUpload && fileName ? "bg-blue" : "bg-transparent"
          } h-[5px] rounded-full absolute bottom-[7px] left-[36px] right-1/2`}
        ></span>
        <span
          className={`${
            isAdd ? "bg-blue" : "bg-transparent"
          } bg-blue h-[5px] rounded-full absolute bottom-[7px] right-[36px] left-1/2`}
        ></span>
        <span className="bg-transparent w-[36px] h-[5px] rounded-full absolute bottom-[7px] right-0"></span>
        {/* Points */}
        <span
          className={`${
            fileName ? "bg-blue" : "bg-white"
          } size-[20px] rounded-full  border border-blue absolute left-[26px] -bottom-[0.5px]`}
        ></span>
        <span
          className={`${
            isAdd ? "bg-blue" : "bg-white"
          } size-[20px] rounded-full border border-blue absolute left-[50%] bottom-[0px] -translate-x-[50%]`}
        ></span>
        <span
          className={`size-[20px] bg-white rounded-full border border-blue absolute right-[26px] bottom-[0px]`}
        ></span>
        {/* title */}
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
