import AmountItem from "../amountItem";

const Viewer = () => {
  return (
    <>
      <div className="mt-[16px] flex flex-col gap-[12px]">
        <AmountItem name="TOTAL WATCH TIME" value={0} src="watch" />
        <div className="flex gap-[8.46px]">
          <AmountItem name="VIDEOS REPRODUCED" value={0} src="reproduce" />
          <AmountItem name="VIDEOS LIKED" value={0} src="like" />
        </div>
        <div className="flex gap-[8.46px]">
          <AmountItem name="COMMENTS" value={0} src="comment" />
          <AmountItem name="CARD SUGGESTIONS" value={0} src="card" />
        </div>
        <div className="flex gap-[8.46px]">
          <AmountItem name="CARDS CLICKED" value={0} src="click" />
          <AmountItem name="CARD SAVED" value={0} src="save" />
        </div>
      </div>
    </>
  );
};

export default Viewer;
