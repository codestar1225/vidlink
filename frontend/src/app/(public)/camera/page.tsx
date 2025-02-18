"use client";
import { useEffect, useRef, useState } from "react";

const CameraCapture = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [isFrontCamera, setIsFrontCamera] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Ensure the component runs only in the browser
  useEffect(() => {
    setIsClient(typeof window !== "undefined" && !!navigator?.mediaDevices);
  }, []);

  const startCamera = async (facingMode: "user" | "environment") => {
    if (!isClient || !navigator?.mediaDevices) {
      console.error("Camera API is not supported in this environment.");
      return;
    }

    try {
      // Stop previous stream if it exists
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }

      const newStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }

      streamRef.current = newStream;
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        setImage(canvasRef.current.toDataURL("image/png"));
      }
    }
  };

  const toggleCamera = () => {
    const newFacingMode = isFrontCamera ? "environment" : "user";
    setIsFrontCamera(!isFrontCamera);
    startCamera(newFacingMode);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {isClient ? (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-64 h-auto rounded-lg"
          />
          <button
            onClick={() => startCamera("environment")}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Start Back Camera
          </button>
          <button
            onClick={toggleCamera}
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            Switch Camera
          </button>
          <button
            onClick={capturePhoto}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Capture Photo
          </button>
          <canvas ref={canvasRef} className="hidden" />
          {image && (
            <img
              src={image}
              alt="Captured"
              className="w-full h-auto rounded-lg"
            />
          )}
        </>
      ) : (
        <p>Camera not supported or loading...</p>
      )}
    </div>
  );
};

export default CameraCapture;
