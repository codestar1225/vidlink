"use client";
import { useState } from "react";
import Card from "./card";
import cards from "./cards.json";
import IndependentCard from "./independentCard";

const Cards = () => {
  const [isEditing, setIsEditing] = useState<string>("LOCATION");

  return (
    <>
      <div className="mx-[19.5] flex flex-col items-center gap-[25px] mt-[36px]">
        <h1 className="text-[10.5px] font-semibold">PREVIEW</h1>
        <div className="flex justify-center">
          <IndependentCard isEditing={isEditing} />
        </div>
      </div>
      <div className="mx-[11px]">
        <div className="text-[16px] border-[2px] rounded-[14.7px] w-[207.5px] h-[36.7px] flex justify-center items-center mx-auto mt-[31.55px]">
          CARD DONE
        </div>
        <div className="flex flex-col items-center gap-[20px] mt-[62.9px]">
          <h1 className="text-[10.5px] font-semibold">LIST OF PROMPTS</h1>
          <ul className="flex flex-wrap justify-start max-[401px]:justify-center content-start gap-[6px] max-w-[380px]">
            {cards.map((item, index) => (
              <Card key={index} setIsEditing={setIsEditing} isEditing={isEditing} name={item.name} src={item.src} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
export default Cards;
