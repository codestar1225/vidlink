"use client";
// import { useTheme } from "next-themes";
import { ChangeEvent, useState } from "react";

export default function Page() {
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [loc, setLoc] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:5000/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, age, location: loc }),
    });

    if (response.ok) {
      console.log("success");
      alert("User saved successfully!");
      setName("");
      setAge(0);
      setLoc("");
    } else {
      alert("Failed to save user.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-5 mt-40"
    >
      <div className="flex justify-between w-[300px]">
        <span>Name</span>
        <input
          type="text"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          className="border-spacing-5 w-20 border-black border-[1px]"
        />
      </div>
      <div className="flex justify-between w-[300px]">
        <span>Age</span>
        <input
          type="number"
          value={age}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setAge(Number(e.target.value))
          }
          className="border-spacing-5 w-20 border-black border-[1px]"
        />
      </div>
      <div className="flex justify-between w-[300px]">
        <span>Location</span>
        <input
          type="text"
          value={loc}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setLoc(e.target.value)
          }
          className="border-spacing-5 w-20 border-black border-[1px]"
        />
      </div>
      <button
        type="submit"
        className="bg-violet-800 p-2 rounded-md text-white font-bold"
      >
        Submit
      </button>
    </form>
  );
}
