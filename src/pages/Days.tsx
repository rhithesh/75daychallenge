import React, { useState, useEffect } from "react";
import { db, Challenge } from "../db";

interface DaysProps {
  day: number;
  f: () => void;
}

export default function Days({ day, f }: DaysProps) {
  const [selected, setSelected] = useState(false);
  const [subCheckboxes, setSubCheckboxes] = useState([false, false]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [remarks, setRemarks] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedRemarks, setEditedRemarks] = useState("");

  useEffect(() => {
    const loadState = async () => {
      const existingChallenge = await db.challenge.get(day);
      if (existingChallenge) {
        setSelected(existingChallenge.selected);
        setSubCheckboxes([existingChallenge.selected, existingChallenge.selected]);
        setRemarks(existingChallenge.remarks || "");
      }
    };
    loadState();
  }, [day]);

  const toggleSelected = async () => {
    try {
      const newSelected = !selected;
      await db.challenge.put({
        day,
        selected: newSelected,
        remarks: remarks
      } as Challenge);
      setSelected(newSelected);
      setSubCheckboxes([newSelected, newSelected]);
      f();
    } catch (error) {
      console.error("Error updating challenge", error);
      setSelected(selected);
    }
  };

  const toggleSubCheckbox = (index: number) => {
    const newSubCheckboxes = [...subCheckboxes];
    newSubCheckboxes[index] = !newSubCheckboxes[index];
    
    const allChecked = newSubCheckboxes.every(checkbox => checkbox);
    
    setSubCheckboxes(newSubCheckboxes);
    
    if (allChecked && !selected) {
      toggleSelected();
    }
    if (!allChecked && selected) {
      toggleSelected();
    }
  };

  const handleStartEditing = () => {
    setEditedRemarks(remarks);
    setIsEditing(true);
  };

  const handleSaveRemarks = async () => {
    try {
      await db.challenge.put({
        day,
        selected,
        remarks: editedRemarks
      } as Challenge);
      setRemarks(editedRemarks);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving remarks", error);
    }
  };

  return (
    <div className="flex flex-col items-center relative">
      <div className="text-white mb-2">Day {day}</div>
      <div
        className={`relative rounded-2xl hover:scale-105 hover:cursor-pointer border-2 transition-all 
          ${selected ? "bg-green-700 border-blue-700" : "border-black"}
          h-[60px] w-[60px] flex items-center justify-center`}
        onClick={toggleSelected}
      >
        {selected && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="absolute w-8 h-8 text-white"
          >
            <path
              fill="currentColor"
              d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
            />
          </svg>
        )}
      </div>
      <div className="flex gap-2 mt-2">
        {subCheckboxes.map((isChecked, index) => (
          <div 
            key={index}
            className={`w-4 h-4 border-2 rounded relative
              ${isChecked ? 'bg-blue-500 border-blue-500' : 'border-gray-400'}
              cursor-pointer`}
            onClick={() => toggleSubCheckbox(index)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {hoveredIndex === index && (
              <div className="absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 
                bg-black text-white text-xs px-2 py-1 rounded">
                {index === 0 ? 'LeetCode(DSA)' : 'WebDev'}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {isEditing ? (
        <div className="w-full mt-2">
          <textarea
            className=" !min-w-[100px] bg-gray-800 text-white p-2 rounded"
            value={editedRemarks}
            onChange={(e) => setEditedRemarks(e.target.value)}
            rows={3}
          />
          <div className="flex justify-end mt-2">
            <button 
              className="bg-green-600 text-white px-3 py-1 rounded mr-2"
              onClick={handleSaveRemarks}
            >
              Save
            </button>
            
          </div>
        </div>
      ) : (
        <div 
          className="w-[200px] mt-2 bg-gray-800 text-white p-2 rounded min-h-[84px]"
          onDoubleClick={handleStartEditing}
        >
          {remarks || "Double-click to add remarks"}
        </div>
      )}
    </div>
  );
}