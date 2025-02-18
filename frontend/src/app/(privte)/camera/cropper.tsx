import { useState, useRef } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "@/utils/cropImage";

interface CropperProps {
  imageSrc: string | null;
  onCropComplete: (croppedImage: Blob) => void;
}

export default function ImageCropper({
  imageSrc,
  onCropComplete,
}: CropperProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const handleCropComplete = (_: any, areaPixels: any) => {
    setCroppedAreaPixels(areaPixels);
  };

  const handleSave = async () => {
    console.log("completed");
    if (!croppedAreaPixels || !imageSrc) return;
    const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
    croppedBlob && onCropComplete(croppedBlob);
  };

  return (
    <div className=" relative h-screen w-screen">
      {imageSrc && (
        <div className="h-[70vh] w-full absolute top-0">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1} // Square crop (change to 16/9 for landscape)
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={handleCropComplete}
          />
        </div>
      )}
      <input
        className=" absolute bottom-[100px] left-1/2 -translate-x-1/2 w-[80vw]"
        type="range"
        min="1"
        max="3"
        step="0.1" // Optional: Allows smoother zoom control
        value={zoom}
        onChange={(e) => setZoom(Number(e.target.value))} // Correct event
      />
      {/* <Slider value={zoom} min={1} max={3} step={0.1} onChange={(e, z) => setZoom(z as number)} /> */}
      <button
        onClick={handleSave}
        className="bg-blue text-white text-[16px] font-semibold tracking-widest h-[40px] w-[100px] flex justify-center items-center rounded-full absolute bottom-[150px] left-1/2 -translate-x-1/2"
      >
        SAVE
      </button>
    </div>
  );
}
