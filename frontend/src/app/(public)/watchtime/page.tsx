"use client";
import { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import axios from "axios";
import useVideo from "@/hooks/useVideo";

const VideoPlayer = () => {
  const { watchTime, loading } = useVideo();
  const playerRef = useRef<ReactPlayer>(null);
  const [watchingTime, setWatchingTime] = useState(0);
  const [lastTime, setLastTime] = useState(0);

  const handleProgress = (state: { playedSeconds: number }) => {
    const currentTime = state.playedSeconds;
    if (currentTime > lastTime) {
      setWatchingTime((prev) => prev + (currentTime - lastTime));
    }
    setLastTime(currentTime);
  };

  const handleSeek = (seconds: number) => {
    console.log("User sought to:", seconds);
    setLastTime(seconds); 
  };

  const handlePause = () => {
    console.log("Video paused. Total watch time:", watchingTime);
  };

  // Function to send watch time
  const sendWatchingTime = async (useBeacon = false) => {
    const payload = JSON.stringify({ watchingTime });

    if (useBeacon && navigator.sendBeacon) {
      // Send data using sendBeacon for reliability
      const endpoint = "/api/watch-time"; // Replace with your backend endpoint
      const blob = new Blob([payload], { type: "application/json" });
      navigator.sendBeacon(endpoint, blob);
      console.log("Watch time sent using sendBeacon:", watchingTime);
    } else {
      // Fallback for normal axios request
      try {
        await axios.post("/api/watch-time", { watchingTime });
        console.log("Watch time sent to backend:", watchingTime);
      } catch (error) {
        console.error("Error sending watch time:", error);
      }
    }
  };



  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      sendWatchingTime(true); // Send data using sendBeacon
      event.preventDefault(); // Some browsers require this for beforeunload
      event.returnValue = ""; // Display a warning message in some browsers
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      sendWatchingTime(); // Send watch time when unmounting normally
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [watchingTime]);

  return (
    <div>
      <ReactPlayer
        ref={playerRef}
        url="https://www.w3schools.com/html/mov_bbb.mp4"
        controls
        playing={false}
        onProgress={handleProgress}
        onPause={handlePause}
        onSeek={handleSeek}
      />
      <p>Watch Time: {Math.floor(watchingTime)} seconds</p>
    </div>
  );
};

export default VideoPlayer;
