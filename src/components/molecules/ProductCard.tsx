"use client";
import { ProductI, useSections } from "@/context/SectionsContext";
import Image from "next/image";

const ProductCard = ({ id, image, name, price }: ProductI) => {
  const { handleProductDragStart, handleProductDrag, handleProductDragEnd } =
    useSections();

  return (
    <div
      className="productCard"
      draggable="true"
      onDragStart={(e) => handleProductDragStart(e, id)}
      onDrag={handleProductDrag}
      onDragEnd={handleProductDragEnd}
    >
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
