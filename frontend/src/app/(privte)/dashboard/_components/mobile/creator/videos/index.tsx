import AmountItem from "../../amountItem";
import Table from "./table";

const Videos = () => {
  return (
    <div className="mt-[15px] flex flex-col gap-[12px]">
      <div className="flex gap-[8.5px]">
        <AmountItem name="VIDEOS" src="videos" value={0} />
        <AmountItem name="LIKES" src="likes" value={0} />
      </div>
      <Table />
      <AmountItem name="TOTAL VIDEO VIEWS" src="views" value={0} />
    </div>
  );
};
export default Videos;
