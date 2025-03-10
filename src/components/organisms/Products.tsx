"use client";
import { useSections } from "@/context/SectionsContext";
import ProductCard from "../molecules/ProductCard";

const Products = () => {
  const { products } = useSections();

  return (
    <div className="products">
      {products.map((product, index) => {
        return <ProductCard key={`${product.name}_${index}`} {...product} />;
      })}
    </div>
  );
};

export default Products;
