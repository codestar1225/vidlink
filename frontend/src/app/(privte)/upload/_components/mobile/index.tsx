"use client";
import { Suspense, useLayoutEffect, useState } from "react";
import ProgressLine from "./progressLine";
import { useVideoValidate } from "@/hooks/useVideoValidate";
import dynamic from "next/dynamic";
import Upload from "./upload";
import Loading from "@/app/_components/ui/loading";
import { useAtom } from "jotai";
import { cardAtom, CardType, editAtom, fileAtom } from "@/store";
import useVideo from "@/hooks/useVideo";
import { getItem, setItem } from "@/utils/localstorage";
const AddCards = dynamic(() => import("./addCards"));
const Preview = dynamic(() => import("./preview"));

const UploadMobile = () => {
  const [edit, setEdit] = useAtom<string>(editAtom);
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
  const [file, setFile] = useAtom<File | null>(fileAtom);
  const [title, setTitle] = useState<string>("");
  const [cards, setCards] = useAtom<CardType[]>(cardAtom);
  const [editSignal, setEditSignal] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const { publish, loading } = useVideo();

  const handlePublish = async () => {
    if (loading) return;
    if (cards.length < 1) {
      return alert("Please fill all the contents.");
    }
    if (!editSignal) return;
    const data = new FormData();
    if (file) {
      data.append("file", file);
    } else if (videoLink) {
      data.append("videoLink", videoLink);
    } else {
      alert("Please provide either a file or a video link.");
      return;
    }
    data.append("title", title);
    data.append("cards", JSON.stringify(cards));
    data.append("duration", duration.toString());
    const res = await publish(data);
    if (res.status === 201 && "videoLink" in res) {
      setVideoLink(res.videoLink);
      setEditSignal(false);
      setItem("editSignal", false);
      cancelVideo();
    } else {
      alert(res.message);
    }
  };

  //draft process
  useLayoutEffect(() => {
    (async () => {
      const draftCards = getItem("cards") as CardType[];
      const draftStatus = getItem("editStatus") as string;
      const draftUrl = getItem("onlineVideo") as string;
      const draftSignal = getItem("editSignal") as boolean;
      const draftTitle = getItem("title") as string;
      if (
        draftCards ||
        draftTitle ||
        (draftStatus && draftUrl && draftSignal)
      ) {
        if (draftCards) {
          setCards(draftCards);
        }
        if (draftTitle) {
          setTitle(draftTitle);
        }
        setVideoLink(draftUrl);
        setEdit(draftStatus);
        setEditSignal(draftSignal);
      } else {
        localStorage.clear();
      }
    })();
  }, []);

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
            videoLink={videoLink}
            duration={duration}
            title={title}
          />
        </Suspense>
      ) : (
        <Suspense fallback={<Loading />}>
          <Preview
            setEdit={setEdit}
            handlePublish={handlePublish}
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
