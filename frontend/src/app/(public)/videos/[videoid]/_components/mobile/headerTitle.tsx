interface Type {
  handleLike(): void;
}

const HeaderTitle: React.FC<Type> = ({ handleLike }) => {
  return (
    <>
      <div className="flex justify-between items-center px-[15px] w-full pb-[10px]">
        <h1 className="text-[14px] font-semibold ">
          <span className="text-blue">WHERE SHE GOES</span>
          &nbsp;- BAD BUNNY
        </h1>
        <div className="flex gap-[13px] items-center">
          <button onClick={handleLike}>
            <img src="/icon/detail/heart.svg" alt="" />
          </button>
          <button>
            <img src="/icon/detail/forward.svg" alt="" />
          </button>
        </div>
      </div>
    </>
  );
};
export default HeaderTitle;
