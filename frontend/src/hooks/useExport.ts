// import { useState } from "react";

// const useExpert = () => {
//   const [loading, setLoading] = useState<boolean>(false);

//   const handleCSV = (data: any, filename = "export") => {
//     if (!data) return;
//     setLoading(true);

//     let csvContent = "";

//     // Handle cases where data is an object or an array
//     if (Array.isArray(data)) {
//       // Extract headers from the first object
//       const headers = Object.keys(data[0]).join(",");
//       csvContent += headers + "\n";

//       // Convert each row into CSV format
//       csvContent += data.map(row => Object.values(row).join(",")).join("\n");
//     } else if (typeof data === "object") {
//       // Single object case (convert keys and values to CSV)
//       csvContent += Object.keys(data).join(",") + "\n";
//       csvContent += Object.values(data).join(",") + "\n";
//     }

//     // Create Blob and trigger download
//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = filename + ".csv";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);

//     setLoading(false);
//   };

//   return { handleCSV, loading };
// };

// export default useExpert;

import { useState } from "react";

const useExpert = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleCSV = (userData: any, videoData: any[], cardData: any[], filename = "export") => {
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
      csvContent += videoData.map(video => Object.values(video).join(",")).join("\n") + "\n\n";
    }

    // Section 3: Card Data
    if (cardData.length) {
      csvContent += "Card Data\n";
      csvContent += Object.keys(cardData[0]).join(",") + "\n";
      csvContent += cardData.map(card => Object.values(card).join(",")).join("\n") + "\n";
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
