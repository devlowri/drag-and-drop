"use client";
import { ProductI, useSections } from "@/context/SectionsContext";
import Image from "next/image";
import TrashIcon from "../atoms/icons/trash";

interface ProductCardId extends ProductI {
  removeFn?: () => void;
}

const ProductCard = ({ removeFn, id, image, name, price }: ProductCardId) => {
  const { handleProductDragStart, handleProductDrag, handleProductDragEnd } =
    useSections();

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
          if (removeFn) removeFn();
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
