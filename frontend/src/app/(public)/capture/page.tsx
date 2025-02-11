"use client";
import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";

const VideoFrameCapture = () => {
  const playerRef = useRef<ReactPlayer>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const captureFrame = () => {
    if (!playerRef.current || !canvasRef.current) return;

    const video = playerRef.current.getInternalPlayer() as HTMLVideoElement;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (video && ctx) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      setCapturedImage(canvas.toDataURL("image/png"));
    }
  };

  return (
    <div>
      <ReactPlayer
        ref={playerRef}
        url="/video/home/home.mp4"
        playing
        controls

      />

      <button onClick={captureFrame}>Capture Frame</button>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {capturedImage && <img src={capturedImage} alt="Captured Frame" />}
    </div>
  );
};

export default VideoFrameCapture;
