import { useState, useEffect } from "react";
import { db, Challenge } from "../db";

interface DaysProps {
  day: number; // Use 'day' for clarity
}

export default function Days({ day }: DaysProps) {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    // Load the selected state from the database on mount
    const loadState = async () => {
      const existingChallenge = await db.challenge.get(day);
      if (existingChallenge) {
        setSelected(existingChallenge.selected);
      }
    };
    loadState();
  }, [day]);

  const toggleSelected = async () => {
    try {
      await db.challenge.put({ day, selected: !selected } as Challenge); // Update or create
      setSelected(!selected); // Update state *after* successful DB write
    } catch (error) {
      console.error("Error updating challenge", error);
      // Revert state on error
      setSelected(selected);
    }
  };

  return (
    <div
      className={`container rounded-2xl hover:scale-105 hover:cursor-pointer border-2 border-black ${
        selected ? "bg-green-700 border-blue-700" : ""
      } h-[40px] w-[40px]`}
      onClick={toggleSelected}
    ></div>
  );
}
