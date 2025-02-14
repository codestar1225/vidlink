"use client";
import FooterMobile from "@/app/_components/layout/mobile/footer";
import { ChangeEvent, useRef, useState } from "react";
import ReactPlayer from "react-player";
import Description from "./description";
import FileUpload from "./fileUpload";
import ButtonItem from "./buttonItem";
import LinkUpload from "./linkUpload";
import { useAtom } from "jotai";
import { cardAtom, CardType } from "@/store";
import useVideo from "@/hooks/useVideo";

interface Type {
  videoSrc: string | null;
  error: string;
  url: string;
  fileDuration: number;
  uploadedFile: File | null;
  validateVideo(value: ChangeEvent<HTMLInputElement>): void;
  setVideoLink(value: string): void;
  setEdit(value: string): void;
  setUrl(value: string): void;
  cancelVideo(): void;
  setDuration(value: number): void;
  setFile(value: File): void;
  setTitle(value: string): void;
}
const Upload: React.FC<Type> = ({
  videoSrc,
  error,
  url,
  fileDuration,
  uploadedFile,
  validateVideo,
  setVideoLink,
  setEdit,
  setUrl,
  cancelVideo,
  setDuration,
  setFile,
  setTitle,
}) => {
  const videoRef = useRef<ReactPlayer>(null);
  const [, setCards] = useAtom<CardType[]>(cardAtom);
  const { loading } = useVideo();

  const handleNext = () => {
    if (videoSrc && url) {
      return alert("Please input one of them.");
    } else if (videoSrc && uploadedFile) {
      setVideoLink(videoSrc);
      setDuration(fileDuration);
      setFile(uploadedFile);
    } else if (url) {
      const linkDuration = videoRef.current?.getDuration();
      if (linkDuration === null || linkDuration === undefined) {
        return alert(
          "Please enter a valid link. Or please check your network connection."
        );
      } else {
        setDuration(linkDuration);
        setVideoLink(url);
      }
    } else {
      return alert("Please enter a file or a link.");
    }
    setEdit("add");
    setCards([]);
    setTitle("");
  };

  return (
    <>
      <ReactPlayer
        ref={videoRef}
        preload="metadata"
        url={url}
        // onError={handleError}
        style={{ display: "none" }}
      />
      <main className="">
        <LinkUpload setUrl={setUrl} url={url} />
        <FileUpload
          validateVideo={validateVideo}
          cancelVideo={cancelVideo}
          error={error}
          videoSrc={videoSrc}
        />
        <Description />
        <ButtonItem
          handleNext={handleNext}
          error={error}
          videoSrc={videoSrc}
          url={url}
          loading={loading}
        />
        <FooterMobile isFixed={true} />
      </main>
    </>
  );
};
export default Upload;
