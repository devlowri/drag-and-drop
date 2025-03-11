"use client";
import Options from "../organisms/Options";
import Products from "../organisms/Products";
import Sections from "../organisms/Sections";

const SectionsTemplate = () => {
  return (
    <section className="sectionsTemplate">
      <Options />
      <div className="sectionsTemplateContent">
        <Products />
        <Sections />
      </div>
    </section>
  );
};

export default SectionsTemplate;
