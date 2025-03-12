"use client";
import { useSections } from "@/context/SectionsContext";
import { useState } from "react";
import PlusIcon from "../atoms/icons/plus";
import MinusIcon from "../atoms/icons/minus";

const MIN_VALUE = 50;
const MAX_VALUE = 125;

const Options = () => {
  const { zoom, setZoom, addRow, setAddProductModal } = useSections();
  const [inputZoom, setInputZoom] = useState(zoom);

  const getSliderPercentage = () => {
    const valueToInt = parseInt(inputZoom);
    if (!isNaN(valueToInt)) {
      const percentage =
        ((valueToInt - MIN_VALUE) / (MAX_VALUE - MIN_VALUE)) * 100;
      return percentage;
    }
    return 0;
  };

  return (
    <div className="options">
      <button
        className="sectionRowButton"
        onClick={() => {
          if (setAddProductModal) setAddProductModal(true);
        }}
      >
        Add new product
      </button>
      <button className="sectionRowButton" onClick={addRow}>
        Add new row
      </button>
      <div
        className="optionsZoom"
        style={
          { "--value": `${getSliderPercentage()}%` } as React.CSSProperties
        }
      >
        <MinusIcon />
        <input
          type="range"
          min={MIN_VALUE}
          max={MAX_VALUE}
          value={inputZoom}
          onChange={(e) => {
            setInputZoom(e.target.value);
          }}
          onTouchEnd={() => {
            if (setZoom) setZoom(inputZoom);
          }}
          onMouseUp={() => {
            if (setZoom) setZoom(inputZoom);
          }}
          onKeyUp={() => {
            if (setZoom) setZoom(inputZoom);
          }}
        />
        <PlusIcon />
        <label>
          <span className="sr-only">Zoom of </span>
          {inputZoom}%
        </label>
      </div>
    </div>
  );
};

export default Options;
