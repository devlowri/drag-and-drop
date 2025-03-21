"use client";
import { PRODUCTS_PER_SECTION, useSections } from "@/context/SectionsContext";
import ProductCard from "./ProductCard";
import AlignLeftIcon from "../atoms/icons/alignLeft";
import AlignCenterIcon from "../atoms/icons/alignCenter";
import AlignRightIcon from "../atoms/icons/alignRight";
import TrashIcon from "../atoms/icons/trash";
import ArrowBarToUpIcon from "../atoms/icons/arrowBarToUp";
import ArrowBarToDownIcon from "../atoms/icons/arrowBarToDown";
import ArrowNarrowDownIcon from "../atoms/icons/arrowNarrowDown";
import ArrowNarrowUpIcon from "../atoms/icons/arrowNarrowUp";
import { SectionI } from "@/types/section.types";

interface SectionRowI {
  rowIndex: number;
  section?: SectionI;
}

const SectionRow = ({ rowIndex, section }: SectionRowI) => {
  const {
    sections,
    handleProductDragOver,
    handleProductDrop,
    handleProductDragLeave,
    updateSectionAligment,
    removeSection,
    moveSectionToTop,
    moveSectionUp,
    moveSectionDown,
    moveSectionToBottom,
    removeProductFromSection,
  } = useSections();

  const isFirstSection = rowIndex === 0;
  const isLastSection = rowIndex === sections.length - 1;
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
          return (
            <ProductCard
              key={`${product.name}_${index}`}
              removeFn={() => {
                if (removeProductFromSection)
                  removeProductFromSection(product.id);
              }}
              {...product}
            />
          );
        })}
      </div>
      <div className="sectionRowSelectedAlignment">
        Aligned to the <b>{section?.alignment}</b>
      </div>
      <div className="sectionRowPosition">
        <button
          aria-label="Move section to the top"
          className="sectionRowButton"
          onClick={() => {
            if (moveSectionToTop) moveSectionToTop(rowIndex);
          }}
          disabled={isFirstSection}
        >
          <ArrowBarToUpIcon />
        </button>
        <button
          aria-label="Move section up one position"
          className="sectionRowButton up"
          onClick={() => {
            if (moveSectionUp) moveSectionUp(rowIndex);
          }}
          disabled={isFirstSection}
        >
          <ArrowNarrowUpIcon />
        </button>
        <button
          aria-label="Move section down one position"
          className="sectionRowButton down"
          onClick={() => {
            if (moveSectionDown) moveSectionDown(rowIndex);
          }}
          disabled={isLastSection}
        >
          <ArrowNarrowDownIcon />
        </button>
        <button
          aria-label="Move section to the bottom"
          className="sectionRowButton"
          onClick={() => {
            if (moveSectionToBottom) moveSectionToBottom(rowIndex);
          }}
          disabled={isLastSection}
        >
          <ArrowBarToDownIcon />
        </button>
      </div>
      <div className="sectionRowOptions">
        <div className="sectionRowOptionsAlignments">
          <button
            aria-label="Align content to the left"
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
            aria-label="Align content to center"
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
            aria-label="Align content to the right"
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
          aria-label="Remove section"
          className="sectionRowButton"
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
