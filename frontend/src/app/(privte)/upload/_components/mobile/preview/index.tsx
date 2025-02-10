"use client";
import Footer from "@/app/_components/layout/mobile/footer";
import { useAtom } from "jotai";
import { cardAtom, CardType } from "@/store";
import CardItem from "./cardItem";
import { Suspense, useEffect, useRef, useState } from "react";
import CardNext from "@/app/_components/ui/cardNext";
import PreviewVideo from "./previewVideo";
import ButtonItem from "./buttonItem";
import Loading from "@/app/_components/ui/loading";

interface Type {
  setEdit(value: string): void;
  handlePublish(): void;
  videoLink: string;
  loading: boolean;
  editSignal: boolean;
}
const Preview: React.FC<Type> = ({
  setEdit,
  handlePublish,
  videoLink,
  loading,
  editSignal,
}) => {
  const [cards] = useAtom<CardType[]>(cardAtom);
  const [fltCards, setFltCards] = useState<CardType[]>([]);
  const [start, setStart] = useState<number>(-1);
  const [no, setNo] = useState<number>(-1);
  const [isSelected, setIsSelected] = useState<number>(0);
  const [signal, setSignal] = useState<boolean>(false);
  const nextCardIndex = useRef<number>(0);

  useEffect(() => {
    const filter = cards.filter((card) => card.isPreview).reverse();
    const nextCard = cards.filter((card) => !card.isPreview)[0] ?? {
      start: -1,
      no: -1,
    };
    setFltCards(filter);
    setStart(nextCard.start);
    setNo(nextCard.no);
  }, []);

  const handleNext = () => {
    nextCardIndex.current += 1;
    const filter = cards.filter((card) => card.isPreview).reverse();
    const hiddenCards = cards.filter((card) => !card.isPreview).reverse();
    const nextCard = cards.filter((card) => !card.isPreview)[
      nextCardIndex.current
    ] ?? {
      start: -1,
      no: -1,
    };
    setStart(nextCard.start);
    setNo(nextCard.no);
    setFltCards(() => [
      ...hiddenCards.slice(
        hiddenCards.length - nextCardIndex.current,
        hiddenCards.length + 1
      ),
      ...filter,
    ]);
  };

  return (
    <>
      <div className="mt-[69px] flex flex-col items-center">
        <PreviewVideo
          cards={cards}
          videoLink={videoLink}
          isSelected={isSelected}
          signal={signal}
        />
        <div className="flex justify-center  px-[10px]">
          <ul className="flex flex-wrap justify-start content-start max-[401px]:justify-center gap-[6px] max-h-[391.7px] max-w-[380px]">
            {start !== -1 && no !== -1 ? (
              <Suspense fallback={<Loading />}>
                <CardNext handleNext={handleNext} no={no} start={start} />
              </Suspense>
            ) : (
              <></>
            )}
            {fltCards.map((item, index) => (
              <Suspense key={index} fallback={<Loading />}>
                <CardItem
                  setIsSelected={setIsSelected}
                  setSignal={setSignal}
                  key={index}
                  name={item.name}
                  icon={item.icon}
                  start={item.start}
                  isPreview={item.isPreview}
                  link={item.link}
                  signal={signal}
                  no={item.no}
                  index={index}
                />
              </Suspense>
            ))}
          </ul>
        </div>
      </div>
      <ButtonItem
        setEdit={setEdit}
        handlePublish={handlePublish}
        loading={loading}
        editSignal={editSignal}
      />
      <Footer isFixed={false} />
    </>
  );
};
export default Preview;
