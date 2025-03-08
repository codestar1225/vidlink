import { useState } from "react";

interface UserData {
  [key: string]: string | number; // Flexible structure to handle dynamic user data
}

interface VideoData {
  Title: string;
  Views: number;
  Likes: number;
  Cards: number;
}

interface CardData {
  Name: string;
  "Video Title": string;
  Clicks: number;
  Saved: number;
  Link: string;
}
type HandleCSV = (
  userData: UserData,
  videoData: VideoData[],
  cardData: CardData[],
  filename?: string
) => void;
const useExpert = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleCSV: HandleCSV = (
    userData,
    videoData,
    cardData,
    filename = "export"
  ) => {
    if (!userData && !videoData.length && !cardData.length) return;
    setLoading(true);

    let csvContent = "";

    // Section 1: User Summary
    csvContent += "User Summary\n";
    csvContent += Object.keys(userData).join(",") + "\n";
    csvContent += Object.values(userData).join(",") + "\n\n";

    // Section 2: Video Data
    if (videoData.length) {
      csvContent += "Video Data\n";
      csvContent += Object.keys(videoData[0]).join(",") + "\n";
      csvContent +=
        videoData.map((video) => Object.values(video).join(",")).join("\n") +
        "\n\n";
    }

    // Section 3: Card Data
    if (cardData.length) {
      csvContent += "Card Data\n";
      csvContent += Object.keys(cardData[0]).join(",") + "\n";
      csvContent +=
        cardData.map((card) => Object.values(card).join(",")).join("\n") + "\n";
    }

    // Create a Blob and trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename + ".csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setLoading(false);
  };

  return { handleCSV, loading };
};

export default useExpert;
