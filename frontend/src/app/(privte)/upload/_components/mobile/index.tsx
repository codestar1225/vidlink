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
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [cards] = useAtom<CardType[]>(cardAtom);
  const [editSignal, setEditSignal] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const { publish, loading } = useVideo();

  // Detect the start of edit.
  useEffect(() => {
    setEditSignal(true);
  }, [videoLink]);

  const handlePublish = () => {
    if (loading) return;
    if (cards.length < 1) {
      return alert("Please fill all the contents.");
    }
    if (!editSignal) return;
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
    console.log(res)
    if (res.status === 201 && "videoLink" in res) {
      setEditSignal(false);
      setVideoLink(res.videoLink);
      cancelVideo();
    } else {
      alert(res.message);
    }
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
          validateVideo={validateVideo}
          setVideoLink={setVideoLink}
          setEdit={setEdit}
          setUrl={setUrl}
          cancelVideo={cancelVideo}
          setDuration={setDuration}
          setFile={setFile}
          setTitle={setTitle}
          setUserName={setUserName}
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
