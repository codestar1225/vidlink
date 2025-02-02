const CardNext = () => {
    return (
      <>
        <div className="border-[0.7px] rounded-[6px] w-[122.41px] h-[93.06px] p-[5.9px] flex flex-col gap-[11px]">
          <div className="text-[13.86px] font-semibold">02</div>
          <div className="flex flex-col items-center h-[38.4px] w-full justify-between">
            <h1 className="text-[13.86px] font-semibold">NEXT</h1>
            <div className="flex items-center gap-[6px]">
              <img src="/icon/detail/card/clock.svg" alt="" />
              <div className="text-[13.86px] font-normal">
                <i>0: 11</i>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  export default CardNext;