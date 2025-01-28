const Customize = () => {
  return (
    <>
      <div className="h-[631px] mt-[56.5px] text-[10.5px] font-semibold mx-[19.5px]">
        <div className="flex flex-col items-center justify-between h-[38px]">
          <h1>ADD CARDS</h1>
          <i className=" font-normal text-[8.5px]">VIDEO 4:28 = MAX 26 CARDS </i>
          <i className="font-normal text-[8.5px]">MAX 1 CARD EVERY 10s</i>
        </div>
        <div className=" h-[59px] flex flex-col justify-between mt-[10.5px]">
          <div className="flex items-center gap-[7px]">
            <div>LINK</div>
            <button>
              <img src="/icon/upload/paste.svg" alt="" />
            </button>
          </div>
          <input
            type="text"
            placeholder="Text"
            className="h-[40px] text-[18px] font-normal w-full bg-[#1E1E1E] border-[2.72px] border-[#505050] rounded-[9px] placeholder:text-[10.5px] placeholder:text-[#505050] placeholder:font-semibold px-[9px]"
          />
        </div>
        <div className=" h-[59px] flex flex-col justify-between mt-[15px]">
          <div>NAME</div>
          <input
            type="text"
            placeholder="Text"
            className="h-[40px] text-[18px] font-normal w-full bg-[#1E1E1E] border-[2.72px] border-[#505050] rounded-[9px] placeholder:text-[10.5px] placeholder:text-[#505050] placeholder:font-semibold px-[9px]"
          />
        </div>
        <div className=" relative h-[59px] flex flex-col justify-between mt-[15px]">
          <div>ICON</div>
          <input
            type="text"
            placeholder='"Location"'
            className="h-[40px] text-[18px] font-normal w-full bg-[#1E1E1E] border-[2.72px] border-[#505050] rounded-[9px] placeholder:text-[10.5px] placeholder:text-[#505050] placeholder:font-semibold px-[9px] placeholder:italic"
          />
          <img
            className="bottom-[8.74px] right-[12.92px] absolute"
            src="/icon/upload/image2.svg"
            alt=""
          />
        </div>
        <div className="flex gap-[20px] items-center h-[60px] mt-[15px]">
          <div className="w-1/2 h-full flex flex-col justify-between">
            <div className="flex  items-center gap-[7px]">
              <div>START</div>
              <button>
                <img src="/icon/upload/clock1.svg" alt="" />
              </button>
            </div>
            <input
              type="text"
              placeholder="Text"
              className="h-[40px] text-[18px] font-normal w-full bg-[#1E1E1E] border-[2.72px] border-[#505050] rounded-[9px] placeholder:text-[10.5px] placeholder:text-[#505050] placeholder:font-semibold px-[9px]"
            />
          </div>
          <div className="w-1/2 h-full flex flex-col justify-between">
            <div className="flex items-center gap-[7px]">
              <div>DURATION</div>
              <button>
                <img src="/icon/upload/clock2.svg" alt="" />
              </button>
            </div>
            <input
              type="text"
              placeholder="Text"
              className="h-[40px] text-[18px] font-normal w-full bg-[#1E1E1E] border-[2.72px] border-[#505050] rounded-[9px] placeholder:text-[10.5px] placeholder:text-[#505050] placeholder:font-semibold px-[9px]"
            />
          </div>
        </div>
        <video
          className="h-[280px] w-full object-cover mt-[20px] rounded-[6.1px] overflow-hidden"
          playsInline
          muted
          preload="auto"
          controls
        >
          <source src={`/video/home/home2.mp4`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </>
  );
};
export default Customize;
