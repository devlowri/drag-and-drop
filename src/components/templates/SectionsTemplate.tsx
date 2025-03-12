"use client";
import { useSections } from "@/context/SectionsContext";
import Options from "../organisms/Options";
import Products from "../organisms/Products";
import Sections from "../organisms/Sections";
import AddProductModal from "../organisms/AddProductModal";

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
      <AddProductModal />
    </section>
  );
};

export default SectionsTemplate;
