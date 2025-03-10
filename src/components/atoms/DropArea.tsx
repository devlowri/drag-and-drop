"use client";
import { useSections } from "@/context/SectionsContext";

interface DropAreaI {
  rowIndex: number;
}

const DropArea = ({ rowIndex }: DropAreaI) => {
  const { isDragging, handleProductDragOver, handleProductDrop } =
    useSections();

  return (
    <div
      className={`dropArea ${isDragging ? "visible" : ""}`}
      onDragOver={handleProductDragOver}
      onDrop={(e) => {
        if (handleProductDrop) handleProductDrop(e, rowIndex);
      }}
    ></div>
  );
};

export default DropArea;
