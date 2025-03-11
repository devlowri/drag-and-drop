"use client";
import { useSections } from "@/context/SectionsContext";
import Options from "../organisms/Options";
import Products from "../organisms/Products";
import Sections from "../organisms/Sections";

const SectionsTemplate = () => {
  const { zoom } = useSections();
  return (
    <section
      className="sectionsTemplate"
      style={{ "--zoom": zoom } as React.CSSProperties}
    >
      <Options />
      <div className="sectionsTemplateContent">
        <Products />
        <Sections />
      </div>
    </section>
  );
};

export default SectionsTemplate;
