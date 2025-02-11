'use client'
import { useState, useRef } from "react";
import ReactPlayer from "react-player";

const VideoPlayer = () => {
  const playerRef = useRef<ReactPlayer>(null);
  const [watchTime, setWatchTime] = useState(0);
  const [lastTime, setLastTime] = useState(0);

  const handleProgress = (state: { playedSeconds: number }) => {
    const currentTime = state.playedSeconds;
    if (currentTime > lastTime) {
      setWatchTime((prev) => prev + (currentTime - lastTime));
    }
    setLastTime(currentTime);
  };

  const handleSeek = (seconds: number) => {
    console.log("User sought to:", seconds);
    setLastTime(seconds); // Reset last watched time to avoid incorrect calculations
  };

  const handlePause = () => {
    console.log("Video paused. Total watch time:", watchTime);
  };

  console.log(watchTime,'whatchtime');
  return (
    <div>
      <ReactPlayer
        ref={playerRef}
        url="https://www.w3schools.com/html/mov_bbb.mp4"
        controls
        playing={false}
        onProgress={handleProgress} // Fires every second
        onPause={handlePause}
        onSeek={handleSeek} // Detects when user jumps in the video
      />
      <p>Watch Time: {Math.floor(watchTime)} seconds</p>
    </div>
  );
};

export default VideoPlayer;
