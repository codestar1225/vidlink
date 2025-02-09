"use client";
import Customize from "./customize";
import Cards from "./cards";
import FooterMobile from "@/app/_components/layout/mobile/footer";
import { ChangeEvent, useEffect, useState } from "react";
import { useAtom } from "jotai";
import { cardAtom, CardType } from "@/store";
import Setting from "./setting";
import { checkUrl } from "@/utils/checkUrl";

interface Type {
  setEdit(value: string): void;
  setEditSignal(value: boolean): void;
  setTitle(value: string): void;
  duration: number;
  videoLink: string;
  title: string;
}

const AddCards: React.FC<Type> = ({
  setEdit,
  setEditSignal,
  setTitle,
  videoLink,
  duration,
  title,
}) => {
  const [cards, setCards] = useAtom<CardType[]>(cardAtom);
  const [imgFile, setImgFile] = useState<string>("");

  const [link, setLink] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [icon, setIcon] = useState<string>("");
  const [start, setSart] = useState<number>(0);
  const [isPreview, setIsPreview] = useState<boolean>(false);

  function handleUploadImg(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImgFile(reader.result as string); // Base64 URL of the image
      };
      reader.readAsDataURL(file);
    }
  }
  const addCard = () => {
    if (cards.length >= Math.floor(duration / 10)) {
      return alert("Your cards exceed their maximum amount.");
    }
    if (!checkUrl(link))
      return alert("Invalid link. Please enter a valid link.");
    if (link && name && icon) {
      const newCard = {
        link,
        name,
        icon,
        start,
        isPreview,
        no: cards.filter((key) => key.start < start).length + 1,
      };
      const alreadyOne = cards.findIndex((item) => item.start === start);
      if (alreadyOne !== -1) {
        cards[alreadyOne] = newCard;
      } else {
        setCards((cards) =>
          [...cards, newCard]
            .sort(function (a, b) {
              return a.start - b.start;
            })
            .map((card) =>
              card.start > start ? { ...card, no: card.no + 1 } : card
            )
        );
        console.log(cards);
      }
      setLink("");
      setName("");
      setIcon("");
      setIsPreview(false);
      setEditSignal(true);
    } else {
      alert(
        `Please enter the ${!link ? "Link " : " "}${!name ? "Name " : " "}${
          !icon ? "Icon" : ""
        }.`
      );
    }
  };

  //Open the preview page
  const handlePreviewPage = () => {
    if (!title) return alert("Please enter a title.");
    if (cards.length < 1) return alert("Please make the cards.");
    setEdit("preview");
  };

  return (
    <>
      <main className="">
        <Setting
          handleUploadImg={handleUploadImg}
          setTitle={setTitle}
          imgFile={imgFile}
          title={title}
        />
        <Customize
          setName={setName}
          setIcon={setIcon}
          setLink={setLink}
          setStart={setSart}
          isPreview={isPreview}
          icon={icon}
          name={name}
          link={link}
          start={start}
          duration={duration}
          videoLink={videoLink}
        />
        <Cards
          addCard={addCard}
          setIsPreview={setIsPreview}
          icon={icon}
          name={name}
          start={start}
          link={link}
          isPreview={isPreview}
        />
        <button
          onClick={handlePreviewPage}
          className="w-[309px] h-[50px] text-[21.5px] font-semibold rounded-[16px] bg-blue mx-auto flex justify-center items-center mt-[57px] mb-[65px] tracking-wider"
        >
          PREVIEW & PUBLISH
        </button>
      </main>
      <FooterMobile isFixed={false} />
    </>
  );
};
export default AddCards;
