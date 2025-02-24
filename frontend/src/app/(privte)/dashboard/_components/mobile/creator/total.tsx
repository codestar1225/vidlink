import AmountItem from "../amountItem";

const Total = () => {
  return (
    <div className="mt-[12px] flex flex-col gap-[12px]">
      <div className="flex gap-[8.46px]">
        <AmountItem name="COMMENTS" value={0} src="comment" />
        <AmountItem name="TOTAL CARD CREATED" value={0} src="card" />
      </div>
      <div className="flex gap-[8.46px]">
        <AmountItem name="TOTAL CARDS CLICKED" value={0} src="click" />
        <AmountItem name="TOTAL CARD SAVED" value={0} src="save" />
      </div>
      <div className="flex gap-[8.46px]">
        <AmountItem name="FOLLOWRES GAINED" value={0} src="gain" />
        <AmountItem name="FOLLOWERS LOST" value={0} src="lost" />
      </div>
    </div>
  );
};
export default Total;
