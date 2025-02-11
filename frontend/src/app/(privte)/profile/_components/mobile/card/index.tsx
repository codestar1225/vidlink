import cards from "../cards.json";
import Card from "./card";
const Cards = () => {
  return (
    <>
      <div className="flex justify-center">
        <div className="text-[14px] font-normal flex flex-col gap-[15px] w-[379.1px] max-[401px]:w-[251px] mt-[48px]">
          <h1>
            <span className=" text-blue font-semibold">WHERE SHE GOES </span> -
            BAD BUNNY
          </h1>
          <ul className="flex flex-wrap justify-start gap-x-[5.9px] gap-y-[7.24px] ">
            {cards.slice(0, 5).map((item, index) => (
              <Card name={item.name} src={item.src} key={index} />
            ))}
          </ul>
          <h1>
            <span className=" text-blue font-semibold">NOT LIKE THIS </span> -
            KENDRICK LAMAR
          </h1>
          <ul className="flex justify-start flex-wrap gap-x-[5.9px]  gap-y-[7.24px]">
            {cards.slice(0, 4).map((item, index) => (
              <Card name={item.name} src={item.src} key={index} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
export default Cards;
