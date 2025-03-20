import {
  MoveSectionDownI,
  MoveSectionToBottomI,
  MoveSectionToTopI,
  MoveSectionUpI,
  RemoveSectionI,
  SectionI,
  UpdateSectionAligmentI,
  useSectionActionsI,
} from "@/types/section.types";
import { useState } from "react";

const DEFAULT_SECTION: SectionI = { alignment: "left", products: [] };

export const useSectionActions = ({
  setProductsToBeSaved,
}: useSectionActionsI) => {
  const [sections, setSections] = useState<SectionI[]>([
    structuredClone(DEFAULT_SECTION),
  ]);

  const updateSectionAligment: UpdateSectionAligmentI = (value, index) => {
    setSections((prevSections) =>
      prevSections.map((section, i) =>
        i === index ? { ...section, alignment: value } : section
      )
    );
  };

  const removeSection: RemoveSectionI = (index) => {
    setSections((prevSections) =>
      prevSections.filter((_, i) => {
        if (i === index) {
          const _products = prevSections[index].products;
          if (_products) setProductsToBeSaved(_products);
        }
        return i !== index;
      })
    );
  };

  const moveSectionToTop: MoveSectionToTopI = (index) => {
    setSections((prevSections) => {
      if (index <= 0) return prevSections;

      const newSections = [...prevSections];
      const [movedSection] = newSections.splice(index, 1);
      newSections.unshift(movedSection);

      return newSections;
    });
  };

  const moveSectionUp: MoveSectionUpI = (index) => {
    setSections((prevSections) => {
      if (index <= 0) return prevSections;

      const newSections = [...prevSections];
      [newSections[index], newSections[index - 1]] = [
        newSections[index - 1],
        newSections[index],
      ];

      return newSections;
    });
  };

  const moveSectionDown: MoveSectionDownI = (index) => {
    setSections((prevSections) => {
      if (index >= prevSections.length - 1) return prevSections;

      const newSections = [...prevSections];
      [newSections[index], newSections[index + 1]] = [
        newSections[index + 1],
        newSections[index],
      ];

      return newSections;
    });
  };

  const moveSectionToBottom: MoveSectionToBottomI = (index) => {
    setSections((prevSections) => {
      if (index >= prevSections.length - 1) return prevSections;

      const newSections = [...prevSections];
      const [movedSection] = newSections.splice(index, 1);
      newSections.push(movedSection);

      return newSections;
    });
  };

  const addRow = () => {
    setSections((prevSections) => [
      ...prevSections,
      structuredClone(DEFAULT_SECTION),
    ]);
  };

  return {
    sections,
    setSections,
    updateSectionAligment,
    removeSection,
    moveSectionToTop,
    moveSectionUp,
    moveSectionDown,
    moveSectionToBottom,
    addRow,
  };
};
