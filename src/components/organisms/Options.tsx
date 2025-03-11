"use client";
import { useSections } from "@/context/SectionsContext";
import { useState } from "react";

const Options = () => {
  const { zoom, setZoom } = useSections();
  const [inputZoom, setInputZoom] = useState(zoom);
  return (
    <div>
      <input
        type="range"
        min="50"
        max="100"
        value={inputZoom}
        onChange={(e) => {
          setInputZoom(e.target.value);
        }}
        onMouseUp={() => {
          if (setZoom) setZoom(inputZoom);
        }}
        onKeyUp={() => {
          if (setZoom) setZoom(inputZoom);
        }}
      />
      <label>Zoom: {inputZoom}</label>
    </div>
  );
};

export default Options;
