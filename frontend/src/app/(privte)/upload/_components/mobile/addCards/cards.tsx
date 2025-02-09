"use client";
import CardItem from "./card";
import IndependentCard from "./independentCard";
import { useAtom } from "jotai";
import { cardAtom, CardType } from "@/store";

interface Type {
  addCard(): void;
  setIsPreview(value: boolean): void;
  name: string;
  start: number;
  icon: string;
  isPreview: boolean;
  link: string;
}
const Cards: React.FC<Type> = ({
  addCard,
  setIsPreview,
  name,
  start,
  icon,
  isPreview,
  link,
}) => {
  const [cards, setCards] = useAtom<CardType[]>(cardAtom);
  const handlePreview = (e: number) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.no === e ? { ...card, isPreview: !card.isPreview } : card
      )
    );
  };

  return (
    <>
      <div className="mx-[19.5] flex flex-col items-center gap-[25px] mt-[36px]">
        <h1 className="text-[10.5px] font-semibold">PREVIEW</h1>
        <div className="flex justify-center">
          <IndependentCard
            icon={icon}
            name={name}
            start={start}
            no={cards.length + 1}
            isPreview={isPreview}
            setIsPreview={setIsPreview}
          />
        </div>
      </div>
      <div className="mx-[11px]">
        <button
          onClick={addCard}
          className={`${
            link && icon && name
              ? "bg-blue border-none"
              : "bg-background border-[2px]"
          } tracking-wider text-[16px]  rounded-[14.7px] w-[207.5px] h-[36.7px] flex justify-center items-center mx-auto mt-[31.55px]`}
        >
          CARD DONE
        </button>
        <div className="flex flex-col items-center gap-[20px] mt-[62.9px]">
          {cards.length > 0 && (
            <h1 className="text-[10.5px] font-semibold">LIST OF PROMPTS</h1>
          )}
          <ul className="flex flex-wrap justify-start max-[401px]:justify-center content-start gap-[6px] max-w-[380px]">
            {cards?.map((item, index) => (
              <CardItem
                handlePreview={handlePreview}
                key={index}
                name={item.name}
                icon={item.icon}
                start={item.start}
                link={item.link}
                isPreview={item.isPreview}
                no={item.no}
                length={cards.length}
              />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
export default Cards;
