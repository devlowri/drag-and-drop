import { PRODUCTS_DEFAULT_DATA } from "@/mock/productsDefaultData";
import {
  AddNewProductI,
  ProductI,
  RemoveProductFromProductsListI,
  RemoveProductFromSectionI,
  useProductActionsI,
} from "@/types/section.types";
import { useState } from "react";

export const useProductActions = ({
  sections,
  setSections,
}: useProductActionsI) => {
  const [products, setProducts] = useState<ProductI[]>([
    ...PRODUCTS_DEFAULT_DATA,
  ]);
  const [addProductModal, setAddProductModal] = useState(false);

  const removeProductFromProductsList: RemoveProductFromProductsListI = (
    id
  ) => {
    setProducts((prevProducts) => prevProducts.filter((p) => p.id !== id));
  };

  const removeProductFromSection: RemoveProductFromSectionI = (id) => {
    const _product = sections
      .flatMap((section) => section.products || [])
      .find((product) => product.id === id);
    setSections((prevSections) =>
      prevSections.map((section) => ({
        ...section,
        products: section.products
          ? section.products.filter((product) => product.id !== id)
          : section.products,
      }))
    );
    setProducts((prevProducts) => [...prevProducts, _product as ProductI]);
  };

  const addNewProduct: AddNewProductI = (e, data) => {
    e.preventDefault();
    setProducts((prevProducts) => [
      { ...data, id: Date.now() },
      ...prevProducts,
    ]);
    setAddProductModal(false);
    const productsListElement = document.getElementsByClassName("products");
    if (productsListElement[0]) {
      productsListElement[0].scrollTop = 0;
    }
  };
  return {
    products,
    setProducts,
    addProductModal,
    setAddProductModal,
    removeProductFromProductsList,
    removeProductFromSection,
    addNewProduct,
  };
};
