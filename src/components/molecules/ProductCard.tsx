"use client";
import { useSections } from "@/context/SectionsContext";
import Image from "next/image";
import TrashIcon from "../atoms/icons/trash";
import { ProductI } from "@/types/section.types";

interface ProductCardId extends ProductI {
  removeFn?: () => void;
}

const ProductCard = ({ removeFn, id, image, name, price }: ProductCardId) => {
  const {
    handleProductDragStart,
    handleProductDrag,
    handleProductDragEnd,
    removeProductFromProductsList,
  } = useSections();

  return (
    <div
      className="productCard"
      draggable="true"
      onDragStart={(e) => {
        if (handleProductDragStart) handleProductDragStart(e, id);
      }}
      onDrag={handleProductDrag}
      onDragEnd={handleProductDragEnd}
    >
      <button
        className="productCardRemove"
        onClick={() => {
          if (removeFn) return removeFn();
          if (removeProductFromProductsList) removeProductFromProductsList(id);
        }}
      >
        <TrashIcon />
      </button>
      <picture className="productCardImageContainer">
        <Image
          src={image}
          alt=""
          width={328}
          height={328}
          className="productCardImage"
        />
      </picture>
      <div className="productCardLabel">{name}</div>
      <span>{price}</span>
    </div>
  );
};

export default ProductCard;
