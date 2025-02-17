"use client";
import Footer from "@/app/_components/layout/mobile/footer";
import UserVideo from "./videos/userVideo";
import RelatedVideo from "./videos/relatedVideo";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SettingBar from "./settingBar";
import useVerifyAuth from "@/hooks/useVerifyAuth";
import CardNext from "@/app/_components/ui/cardNext";
import { UserInfo, VideoInfo, VideoType } from "../../page";
import { Suspense, useEffect, useRef, useState } from "react";
import PreviewVideo from "./previewVideo";
import { CardType } from "@/store";
import Loading from "@/app/_components/ui/loading";
import CardItem from "./card/cardItem";
import useVideo from "@/hooks/useVideo";

interface Type {
  setFollowStatus(value: boolean): void;
  userInfo: UserInfo;
  videoInfo: VideoInfo;
  userVideos: VideoType[];
  relatedVideos: VideoType[];
  videoId: string | undefined;
  followStatus: boolean;
}
const VideoMobile: React.FC<Type> = ({
  setFollowStatus,
  userInfo,
  videoInfo,
  userVideos,
  relatedVideos,
  videoId,
  followStatus
}) => {
  const { addLike } = useVideo();
  const [like, setLike] = useState<boolean>(userInfo.like);
  const router = useRouter();
  const { isAuth } = useVerifyAuth();

  const [fltCards, setFltCards] = useState<CardType[]>([]);
  const [nextCard, setNextCard] = useState<{ start: number; no: number }>({
    start: -1,
    no: -1,
  });
  const [isSelected, setIsSelected] = useState<number>(0);
  const [signal, setSignal] = useState<boolean>(false);
  const nextCardIndex = useRef<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [currentCard, setCurrentCard] = useState<number>(0);

  // initializing the next cards when first mount
  useEffect(() => {
    const filter = videoInfo.cards.slice(0, 1);
    setFltCards(filter);
    const nextCard = videoInfo.cards[1] ?? { start: -1, no: -1 };
    setNextCard({ start: nextCard.start, no: nextCard.no });
  }, []);

  //The ordred display of card's blue color
  useEffect(() => {
    const index = videoInfo.cards.findLastIndex(
      (card) => card.start <= currentTime
    );
    setCurrentCard(index);
  }, [currentTime]);

  const handleNext = () => {
    nextCardIndex.current += 1;
    const nextCard = videoInfo.cards[nextCardIndex.current + 1] ?? {
      start: -1,
      no: -1,
    };
    setNextCard({ start: nextCard.start, no: nextCard.no });
    setFltCards(videoInfo.cards.slice(0, nextCardIndex.current + 1).reverse());
    setCurrentCard((prev) => prev + 1);
    setIsSelected(videoInfo.cards[nextCardIndex.current].start);
  };

  const handleLike = async () => {
    if (userInfo.owner) {
      return alert("You can't do this because you are an owner.");
    }
    if (!isAuth) {
      alert("You must log in before the adding Likes.")
      return router.push("/signin");
    } else {
      if (!videoId) return;
      const res = await addLike(videoId);
      if (res.status === 200 && "like" in res) {
        setLike(res.like);
        router.refresh();
      }
    }
  };

  return (
    <>
      <div className="flex flex-col justify-between min-h-screen">
        <div className="min-h-screen  pt-[110px] pb-[50px] flex flex-col items-center">
          <PreviewVideo
            setCurrentTime={setCurrentTime}
            cards={videoInfo.cards}
            videoLink={videoInfo.videoLink}
            isSelected={isSelected}
            signal={signal}
            handleLike={handleLike}
            title={videoInfo.title}
            userName={userInfo.userName}
            like={like}
          />
          <SettingBar
            handleLike={handleLike}
            setFollowStatus={setFollowStatus}
            isAuth={isAuth}
            userInfo={userInfo}
            cards={videoInfo.cards.length}
            like={like}
            userId={videoInfo.userId}
            followStatus={followStatus}

          />
          <div className="flex justify-center  px-[10px]">
            <ul className="flex flex-wrap justify-start content-start max-[401px]:justify-center gap-[6px] max-h-[391.7px] max-w-[380px]">
              {nextCard.start !== -1 && nextCard.no !== -1 ? (
                <Suspense fallback={<Loading />}>
                  <CardNext
                    handleNext={handleNext}
                    no={nextCard.no}
                    start={nextCard.start}
                  />
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
                    isSaved={item.isSaved}
                    link={item.link}
                    signal={signal}
                    no={item.no}
                    index={index}
                    currentCard={currentCard}
                  />
                </Suspense>
              ))}
            </ul>
          </div>
        </div>
        <UserVideo userVideos={userVideos} />
        <RelatedVideo relatedVideos={relatedVideos} />
        <div className="w-svw flex justify-center">
          <Link
            href={"/videos"}
            className="border-[1.5px] border-white rounded-[3.2px] text-[14.91px] pt-[3.2px] pb-[1.3px] px-[2.13px] mt-[94.5px] mb-[132.6px]"
          >
            ALL VIDEOS
          </Link>
        </div>
        <Footer isFixed={true} />
      </div>
    </>
  );
};
export default VideoMobile;
