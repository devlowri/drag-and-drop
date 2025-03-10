"use client";
import { ProductI, useSections } from "@/context/SectionsContext";
import ProductCard from "./ProductCard";

interface SectionRowI {
  rowIndex: number;
  products?: ProductI[];
}

const SectionRow = ({ rowIndex, products }: SectionRowI) => {
  const { handleProductDragOver, handleProductDrop, handleProductDragLeave } =
    useSections();

  return (
    <div className="sectionRowWrapper">
      <div
        className="sectionRow"
        onDragOver={handleProductDragOver}
        onDragLeave={handleProductDragLeave}
        onDrop={(e) => handleProductDrop(e, rowIndex)}
      >
        {products?.map((product, index) => {
          return <ProductCard key={`${product.name}_${index}`} {...product} />;
        })}
      </div>
      <div className="sectionRowDrag">
        <div className="sectionRowDragIndicator">
          {Array.from({ length: 8 }).map((_, index) => {
            return (
              <div key={`circle_${index}`} className="dragIndicatorCircle" />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SectionRow;
