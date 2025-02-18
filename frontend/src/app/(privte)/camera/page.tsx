"use client";
import { useEffect, useRef, useState } from "react";
import ImageCropper from "./cropper";

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

  const capturePhoto = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    const context = canvasRef.current.getContext("2d");
    if (context) {
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(
        videoRef.current,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      // Convert to Base64
      const base64Image = canvasRef.current.toDataURL("image/png");
      setImage(base64Image);

      // Convert Base64 to Blob
      const blob = await fetch(base64Image).then((res) => res.blob());

      // Create FormData and send to backend
      const formData = new FormData();
      formData.append("file", blob, "photo.png");
      console.log(formData.get("file"), "formdata");
      console.log(blob, "blob");
    }
  };

  const toggleCamera = () => {
    const newFacingMode = isFrontCamera ? "environment" : "user";
    setIsFrontCamera(!isFrontCamera);
    startCamera(newFacingMode);
  };

  const handleConfirm = (imgBlob: any) => {
    setImage("");
  };
  useEffect(() => {
    startCamera("environment");
  }, []);
  return !image ? (
    <div className="h-screen relative w-screen">
      {isClient ? (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="h-full w-full object-cover"
          ></video>
          <div className="flex flex-col items-center gap-3 absolute bottom-5 left-1/2 -translate-x-1/2">
            <button
              onClick={() => startCamera("environment")}
              className="bg-blue w-[200px] text-white px-4 py-2 rounded"
            >
              Start Back Camera
            </button>
            <button
              onClick={toggleCamera}
              className="bg-yellow-500 w-[200px] text-white px-4 py-2 rounded"
            >
              Switch Camera
            </button>
            <button
              onClick={capturePhoto}
              className="bg-green-500 w-[200px] text-white px-4 py-2 rounded"
            >
              Capture Photo
            </button>
          </div>
          <canvas
            ref={canvasRef}
            width="2400"
            height="1480"
            className="hidden"
          />
          {/* {image && (
            <img
              src={image}
              alt="Captured"
              className="w-full h-auto rounded-lg"
            />
          )} */}
        </>
      ) : (
        <p>Camera not supported or loading...</p>
      )}
    </div>
  ) : (
    <>
      <ImageCropper imageSrc={image} onCropComplete={handleConfirm} />
    </>
  );
};

export default CameraCapture;
