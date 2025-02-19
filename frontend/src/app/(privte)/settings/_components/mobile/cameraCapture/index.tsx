"use client";
import { useEffect, useRef, useState } from "react";
import { CircleDot, LogOut, SwitchCamera } from "lucide-react";

interface Type {
  setEdit(value: string): void;
}
const CameraCapture: React.FC<Type> = ({ setEdit }) => {
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
      setEdit("process");
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

  useEffect(() => {
    if (isClient && videoRef.current && navigator?.mediaDevices) {
      startCamera("environment");
    }
  }, []);
  return (
    <>
      <div className="h-screen relative w-screen">
        {isClient ? (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="h-full w-full object-cover"
            ></video>
            <div className="flex items-center gap-5 absolute bottom-[70px] left-1/2 -translate-x-1/2">
              <button onClick={toggleCamera}>
                <SwitchCamera className="size-9" />
              </button>
              <button onClick={capturePhoto}>
                <CircleDot className="size-14 text-blue" />
              </button>
              <button onClick={() => setEdit("")}>
                <LogOut className="size-9" />
              </button>
            </div>
            <canvas
              ref={canvasRef}
              width="2400"
              height="1480"
              className="hidden"
            />
          </>
        ) : (
          <p>Camera not supported or loading...</p>
        )}
      </div>
    </>
  );
};

export default CameraCapture;
