"use client";
import { Suspense, useEffect, useState } from "react";
import ProgressLine from "./progressLine";
import { useVideoValidate } from "@/hooks/useVideoValidate";
import dynamic from "next/dynamic";
import Upload from "./upload";
import Loading from "@/app/_components/ui/loading";
import { useAtom } from "jotai";
import { cardAtom, CardType } from "@/store";
import { confirmModal } from "@/utils/confirm";
import useVideo from "@/hooks/useVideo";
const AddCards = dynamic(() => import("./addCards"));
const Preview = dynamic(() => import("./preview"));

const UploadMobile = () => {
  const [edit, setEdit] = useState<string>("upload");
  const {
    error,
    videoSrc,
    uploadedFile,
    fileDuration,
    validateVideo,
    cancelVideo,
  } = useVideoValidate();
  const [videoLink, setVideoLink] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [duration, setDuration] = useState<number>(0);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [cards] = useAtom<CardType[]>(cardAtom);
  const [editSignal, setEditSignal] = useState<boolean>(false);
  const { publish, loading } = useVideo();

  // Detect the start of edit.
  useEffect(() => {
    setEditSignal(true);
  }, [videoLink]);

  const handlePublish = () => {
    if (cards.length < 1) {
      return alert("Please fill all the contents.");
    }
    if (!editSignal) {
      return alert("Nothing has changed.");
    }
    confirmModal("Are you sure you want to publish this video?", videoPublish);
  };
  const videoPublish = async () => {
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
    if (res.status === 201) {
      setEditSignal(false);
      // if (
      //   "cards" in res &&
      //   "videoLink" in res &&
      //   "duration" in res &&
      //   "title" in res
      // ) {
      //   setVideoLink(res.videoLink);
      //   setDuration(res.duration);
      //   setCards(res.cards);
      //   setTitle(res.title);
      // } else {
      //   return alert("Something went wrong.");
      // }
    } else {
      alert(res.message);
      return
    }
    console.log("upload success");
  };

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
          videoSrc={videoSrc}
          error={error}
          url={url}
          fileDuration={fileDuration}
          uploadedFile={uploadedFile}
          validateVideo={validateVideo}
          setVideoLink={setVideoLink}
          setEdit={setEdit}
          setUrl={setUrl}
          cancelVideo={cancelVideo}
          setDuration={setDuration}
          setFile={setFile}
          setTitle={setTitle}
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
          />
        </Suspense>
      )}
    </>
  );
};
export default UploadMobile;
