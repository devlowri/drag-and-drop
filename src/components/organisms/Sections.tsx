"use client";
import { useSections } from "@/context/SectionsContext";
import SectionRow from "../molecules/SectionRow";

const Sections = () => {
  const { sections } = useSections();

  return (
    <div className="sections">
      {sections.map((section, index) => (
        <SectionRow
          key={`section_row_${index}`}
          rowIndex={index}
          products={section.products}
        />
      ))}
    </div>
  );
};

export default Sections;
