"use client";
import {
  PRODUCTS_PER_SECTION,
  SectionI,
  useSections,
} from "@/context/SectionsContext";
import ProductCard from "./ProductCard";
import AlignLeftIcon from "../atoms/icons/alignLeft";
import AlignCenterIcon from "../atoms/icons/alignCenter";
import AlignRightIcon from "../atoms/icons/alignRight";
import TrashIcon from "../atoms/icons/trash";

interface SectionRowI {
  rowIndex: number;
  section?: SectionI;
}

const SectionRow = ({ rowIndex, section }: SectionRowI) => {
  const {
    handleProductDragOver,
    handleProductDrop,
    handleProductDragLeave,
    updateSectionAligment,
    removeSection,
  } = useSections();

  const hasMaximumProducts = section?.products?.length === PRODUCTS_PER_SECTION;

  return (
    <div className="sectionRowWrapper">
      <div
        className={`sectionRow ${section?.alignment}`}
        onDragOver={(e) => {
          if (hasMaximumProducts) return;
          if (handleProductDragOver) handleProductDragOver(e);
        }}
        onDragLeave={(e) => {
          if (hasMaximumProducts) return;
          if (handleProductDragLeave) handleProductDragLeave(e);
        }}
        onDrop={(e) => {
          if (hasMaximumProducts) return;
          if (handleProductDrop) handleProductDrop(e, rowIndex);
        }}
      >
        {section?.products?.map((product, index) => {
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
      <div className="sectionRowOptions">
        <div className="sectionRowOptionsAlignments">
          <button
            className={`${section?.alignment === "left" ? "selected" : ""}`}
            onClick={() => {
              if (updateSectionAligment)
                updateSectionAligment("left", rowIndex);
            }}
            disabled={section?.alignment === "left"}
          >
            <AlignLeftIcon />
          </button>
          <button
            className={`${section?.alignment === "center" ? "selected" : ""}`}
            onClick={() => {
              if (updateSectionAligment)
                updateSectionAligment("center", rowIndex);
            }}
            disabled={section?.alignment === "center"}
          >
            <AlignCenterIcon />
          </button>
          <button
            className={`${section?.alignment === "right" ? "selected" : ""}`}
            onClick={() => {
              if (updateSectionAligment)
                updateSectionAligment("right", rowIndex);
            }}
            disabled={section?.alignment === "right"}
          >
            <AlignRightIcon />
          </button>
        </div>
        <button
          className="sectionRowRemove"
          onClick={() => {
            if (removeSection) removeSection(rowIndex);
          }}
        >
          <TrashIcon />
        </button>
      </div>
    </div>
  );
};

export default SectionRow;
