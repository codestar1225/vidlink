"use client";
import { Suspense, useLayoutEffect, useState } from "react";
import ProgressLine from "./progressLine";
import { useVideoValidate } from "@/hooks/useVideoValidate";
import dynamic from "next/dynamic";
import Upload from "./upload";
import Loading from "@/app/_components/ui/loading";
import { useAtom } from "jotai";
import { cardAtom, CardType } from "@/store";
import useVideo from "@/hooks/useVideo";
import { getItem, setItem } from "@/utils/localstorage";
import Cookies from "js-cookie";
const AddCards = dynamic(() => import("./addCards"), { ssr: false });
const Preview = dynamic(() => import("./preview"), { ssr: false });

const UploadMobile = () => {
  const [edit, setEdit] = useState<string>("upload");
  const {
    validateVideo,
    cancelVideo,
    error,
    videoSrc,
    uploadedFile,
    fileDuration,
  } = useVideoValidate();
  const [videoLink, setVideoLink] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [duration, setDuration] = useState<number>(0);
  const [, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [info, setInfo] = useState<string>("");
  const [cards, setCards] = useAtom<CardType[]>(cardAtom);
  const [editSignal, setEditSignal] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [hasMounted, setHasMounted] = useState(false);
  const { publish, loading } = useVideo();

  const handlePublish = async () => {
    if (loading) return;
    if (cards.length < 1) {
      return alert("Please fill all the contents.");
    }
    if (!editSignal) return;
    const data = new FormData();
    // if (file instanceof File) {
    //   data.append("file", file);
    // } else
    if (videoLink) {
      data.append("videoLink", videoLink);
    } else {
      alert("Please provide either a file or a video link.");
      return;
    }
    data.append("title", title || "");
    data.append("info", info || "");
    data.append("cards", JSON.stringify(cards || []));
    data.append("duration", String(duration || 0));
    const res = await publish(data);
    if (res.status === 201 && "videoLink" in res) {
      setVideoLink(res.videoLink);
      setEditSignal(false);
      if (typeof window !== "undefined") {
        setItem("editSignal", false);
      }
      cancelVideo();
    } else {
      alert(res.message);
    }
  };

  // draft process for cusomter
  useLayoutEffect(() => {
    const draftCards = getItem("cards") as CardType[] | null;
    const draftStatus = getItem("editStatus") as string | null;
    const draftUrl = getItem("onlineVideo") as string | null;
    const draftSignal = getItem("editSignal") as boolean | null;
    const draftTitle = getItem("title") as string | null;
    const draftInfo = getItem("info") as string | null;
    const user = Cookies.get("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setUserName(parsedUser.userName);
    }
    if (draftCards || draftTitle || draftInfo || (draftStatus && draftUrl)) {
      if (draftCards) setCards(draftCards);
      if (draftTitle) setTitle(draftTitle);
      if (draftInfo) setInfo(draftInfo);
      if (draftSignal) setEditSignal(draftSignal);
      if (draftUrl) setVideoLink(draftUrl);
      if (draftStatus) setEdit(draftStatus);
    } else {
      localStorage.clear();
    }
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;
  return (
    <>
      <ProgressLine
        setEdit={setEdit}
        cancelVideo={cancelVideo}
        setUrl={setUrl}
        edit={edit}
        url={url}
        videoSrc={videoSrc}
        videoLink={videoLink}
        editSignal={editSignal}
      />
      {edit === "upload" ? (
        <Upload
          validateVideo={validateVideo}
          setVideoLink={setVideoLink}
          setEdit={setEdit}
          setUrl={setUrl}
          cancelVideo={cancelVideo}
          setDuration={setDuration}
          setFile={setFile}
          setTitle={setTitle}
          setUserName={setUserName}
          setEditSignal={setEditSignal}
          videoSrc={videoSrc}
          error={error}
          url={url}
          fileDuration={fileDuration}
          uploadedFile={uploadedFile}
        />
      ) : edit === "add" ? (
        <Suspense fallback={<Loading />}>
          <AddCards
            setEdit={setEdit}
            setEditSignal={setEditSignal}
            setTitle={setTitle}
            setInfo={setInfo}
            videoLink={videoLink}
            duration={duration}
            title={title}
            info={info}
          />
        </Suspense>
      ) : (
        <Suspense fallback={<Loading />}>
          <Preview
            setEdit={setEdit}
            handlePublish={handlePublish}
            setEditSignal={setEditSignal}
            videoLink={videoLink}
            loading={loading}
            editSignal={editSignal}
            userName={userName}
            title={title}
          />
        </Suspense>
      )}
    </>
  );
};
export default UploadMobile;
