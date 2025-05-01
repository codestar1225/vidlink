"use client";
import Customize from "./customize";
import Cards from "./cards";
import FooterMobile from "@/app/_components/layout/mobile/footer";
import { useState } from "react";
import { useAtom } from "jotai";
import { cardAtom, CardType } from "@/store";
import Setting from "./setting";
import { checkUrl } from "@/utils/checkUrl";
import { confirmModal } from "@/utils/confirm";
import { setItem } from "@/utils/localstorage";

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
  // duration,
  title,
}) => {
  const [cards, setCards] = useAtom<CardType[]>(cardAtom);
  // const [imgFile, setImgFile] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [icon, setIcon] = useState<string>("");
  const [start, setSart] = useState<number>(0);
  const [isSaved, setIsSaveed] = useState<boolean>(false);

  // function handleUploadImg(e: ChangeEvent<HTMLInputElement>) {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const allowedTypes = [
  //       "image/png",
  //       "image/jpeg",
  //       "image/jpg",
  //       "image/gif",
  //       "image/webp",
  //       "image/svg+xml",
  //       "image/bmp",
  //     ];
  //     if (!allowedTypes.includes(file.type)) {
  //       return alert("Invalid file type. Please upload an image.");
  //     }
  //     const imgUrl = URL.createObjectURL(file);
  //     setImgFile(imgUrl);
  //   }
  // }

  const addCard = () => {
    // if (cards.length >= Math.floor(duration / 10) + 1 || cards.length >= 24) {
    //   return alert("Your cards exceed their maximum amount.");
    // }
    if (!link || !name || !icon) {
      return alert(
        `Please enter the ${!link ? "Link " : " "}${!name ? "Name " : " "}${
          !icon ? "Icon" : ""
        }.`
      );
    }
    if (!checkUrl(link))
      return alert("Invalid link. Please enter a valid link.");
    if (!isTimeDif(start))
      return alert("You must keep 3s difference between cards.");
    const newCard = {
      link,
      name,
      icon,
      start,
      isSaved,
      no: cards.filter((key) => key.start < start).length + 1,
    };
    const alreadyOne = cards.some((item) => item.start === start);
    if (!alreadyOne) {
      addCards(newCard);
    } else {
      confirmModal(
        "A card with the same start time already exists. Do you want to replace the existing card with this one?",
        () => replaceCard(newCard)
      );
    }
    setItem("editSignal", true);
  };

  const isTimeDif = (time: number) => {
    const bigItem = cards.find((item) => item.start > time);
    const lessItem = cards.findLast((item) => item.start < time);
    let dif1 = 4;
    let dif2 = 4;
    if (bigItem?.start) {
      dif1 = bigItem.start - time;
    }
    if (lessItem?.start) {
      dif2 = time - lessItem.start; // Flip to get positive diff
    }
    if (dif1 < 3 || dif2 < 3) {
      return false;
    } else {
      return true;
    }
  };

  // replace existing card with new card
  const replaceCard = (newCard: CardType) => {
    const alreadyOne = cards.findIndex((item) => item.start === start);
    const updatedCards = [...cards];
    updatedCards[alreadyOne] = newCard;
    setCards(updatedCards);
    setItem("cards", updatedCards);
    setLink("");
    setName("");
    setIcon("");
    setIsSaveed(false);
    setEditSignal(true);
  };

  // add new card to existing cards.
  const addCards = (newCard: CardType) => {
    const newCards = [...cards, newCard]
      .sort(function (a, b) {
        return a.start - b.start;
      })
      .map((card) =>
        card.start > start ? { ...card, no: card.no + 1 } : card
      );
    setCards(newCards);
    setItem("cards", newCards);
    setLink("");
    setName("");
    setIcon("");
    setIsSaveed(false);
    setEditSignal(true);
  };

  //Open the preview page
  const handlePreviewPage = () => {
    if (!title) return alert("Please enter a title.");
    if (cards.length < 1) return alert("Please make the cards.");
    setEdit("preview");
    setItem("editStatus", "preview");
  };

  return (
    <>
      <main>
        <Setting setTitle={setTitle} title={title} />
        <Customize
          setName={setName}
          setIcon={setIcon}
          setLink={setLink}
          setStart={setSart}
          isSaved={isSaved}
          icon={icon}
          name={name}
          link={link}
          start={start}
          videoLink={videoLink}
        />
        <Cards
          addCard={addCard}
          setIsSaveed={setIsSaveed}
          setEditSignal={setEditSignal}
          setName={setName}
          setIcon={setIcon}
          setLink={setLink}
          setStart={setSart}
          icon={icon}
          name={name}
          start={start}
          link={link}
          isSaved={isSaved}
        />
        <button
          onClick={handlePreviewPage}
          className="h-[50px] pt-[3px] px-[20px] text-[25px] font-semibold rounded-[16px] bg-blue mx-auto flex justify-center items-center mt-[57px] mb-[65px] tracking-wide"
        >
          PREVIEW & PUBLISH
        </button>
      </main>
      <FooterMobile isFixed={false} />
    </>
  );
};
export default AddCards;
