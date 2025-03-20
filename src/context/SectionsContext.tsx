"use client";
import { useProductActions } from "@/hooks/useProducts";
import { useSectionActions } from "@/hooks/useSections";
import {
  HandleProductDragStartI,
  HandleProductDropI,
  ProductI,
  SectionAligmentT,
  SectionI,
  SectionsContextI,
  SectionsProviderI,
} from "@/types/section.types";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const SectionsContext = createContext<SectionsContextI>({
  sections: [],
  products: [],
  zoom: "100",
  addProductModal: false,
});

export const PRODUCTS_PER_SECTION = 3;

const SectionsProvider = ({ children }: SectionsProviderI) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState<SectionAligmentT | undefined>(
    undefined
  );
  const [productId, setProductId] = useState<number | undefined>(undefined);
  const [rowWithProductId, setRowWithProductId] = useState<number | undefined>(
    undefined
  );
  const [zoom, setZoom] = useState("100");
  const [productIsRemovable, setProductIsRemovable] = useState(false);

  const [productsToBeSaved, setProductsToBeSaved] = useState<ProductI[]>([]);

  const {
    sections,
    setSections,
    updateSectionAligment,
    removeSection,
    moveSectionToTop,
    moveSectionUp,
    moveSectionDown,
    moveSectionToBottom,
    addRow,
  } = useSectionActions({ setProductsToBeSaved });
  const {
    products,
    setProducts,
    addProductModal,
    setAddProductModal,
    removeProductFromProductsList,
    removeProductFromSection,
    addNewProduct,
  } = useProductActions({ sections, setSections });

  const ghostRef = useRef<HTMLDivElement | null>(null);

  const handleProductDragStart: HandleProductDragStartI = (e, id) => {
    setIsDragging(true);
    e.dataTransfer.setDragImage(new Image(), 0, 0);
    setProductId(id);

    const originalRect = e.currentTarget.getBoundingClientRect();

    const offsetX = e.clientX - originalRect.left;
    const offsetY = e.clientY - originalRect.top;

    const ghost = document.createElement("div");
    ghost.className = "productCard dragging";
    ghost.style.width = `${originalRect.width}px`;
    ghost.style.height = `${originalRect.height}px`;
    ghost.innerHTML = e.currentTarget.innerHTML;

    document.body.appendChild(ghost);
    ghostRef.current = ghost;

    ghost.dataset.offsetX = offsetX.toString();
    ghost.dataset.offsetY = offsetY.toString();
  };

  const handleProductDrag = (e: React.DragEvent<HTMLDivElement>) => {
    if (ghostRef.current) {
      const offsetX = Number(ghostRef.current.dataset.offsetX);
      const offsetY = Number(ghostRef.current.dataset.offsetY);

      ghostRef.current.style.left = `${e.clientX - offsetX}px`;
      ghostRef.current.style.top = `${e.clientY - offsetY}px`;
    }
  };

  const handleProductDragEnd = () => {
    setIsDragging(false);
    if (ghostRef.current) {
      document.body.removeChild(ghostRef.current);
      ghostRef.current = null;
    }
  };

  const handleProductDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const container = e.currentTarget;
    const containerWidth = container.offsetWidth;

    const pointerX = e.clientX - container.getBoundingClientRect().left;

    let productPlaceholder = container.querySelector(".productPlaceholder");
    if (productPlaceholder) {
      productPlaceholder.remove();
    }

    productPlaceholder = document.createElement("div");
    productPlaceholder.classList.add("productPlaceholder");

    const zone = pointerX / containerWidth;

    if (zone < 0.33) {
      container.prepend(productPlaceholder);
      setPosition("left");
    } else if (zone >= 0.33 && zone < 0.66) {
      const children = Array.from(container.children);
      if (children.length > 0) {
        const middleIndex = Math.floor(children.length / 2);
        const middleElement = children[middleIndex];
        container.insertBefore(productPlaceholder, middleElement);
      } else {
        container.appendChild(productPlaceholder);
      }
      setPosition("center");
    } else {
      container.appendChild(productPlaceholder);
      setPosition("right");
    }
  };

  const handleProductDrop: HandleProductDropI = (e, rowIndex) => {
    e.preventDefault();

    const productPlaceholder = document.querySelector(".productPlaceholder");
    if (productPlaceholder) {
      productPlaceholder.remove();
    }

    setProductToSectionById(rowIndex);
    setProducts(products);
  };

  const handleProductDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    const container = e.currentTarget;

    if (e.relatedTarget && container.contains(e.relatedTarget as Node)) {
      return;
    }

    const productPlaceholder = container.querySelector(".productPlaceholder");
    if (productPlaceholder) {
      productPlaceholder.remove();
    }
  };

  const setProductToSectionById = (rowIndex: number) => {
    setSections((prevSections) => {
      const updatedSections = prevSections.map((section, index) => {
        if (index === rowIndex) {
          const updatedSection = { ...section };
          let product: ProductI | undefined = products.find(
            (product) => product.id === productId
          );
          if (!product) {
            product = sections
              .flatMap((s) => s.products)
              .find((p) => p?.id === productId);
            if (section.products?.some((p) => p.id === productId)) {
              updatedSection.products = updatedSection.products?.filter(
                (p) => p.id !== productId
              );
            } else {
              const sectionId = sections.findIndex((s) =>
                s.products?.some((p) => p.id === productId)
              );
              setRowWithProductId(sectionId);
            }
          }
          if (!updatedSection.products) {
            return {
              ...updatedSection,
              products: [product],
            } as SectionI;
          } else {
            return {
              ...updatedSection,
              products: (() => {
                const updatedProducts = [...updatedSection.products];
                if (position === "left") {
                  updatedProducts.unshift(product!);
                }
                if (position === "center") {
                  updatedProducts.splice(1, 0, product!);
                }
                if (position === "right") {
                  updatedProducts.push(product!);
                }
                return updatedProducts;
              })(),
            } as SectionI;
          }
        }
        return section;
      });
      handleProductDragEnd();
      setProductIsRemovable(true);
      return updatedSections;
    });
  };

  useEffect(() => {
    if (productIsRemovable) {
      if (rowWithProductId !== undefined) {
        setSections((prevSections) =>
          prevSections.map((section, index) => {
            if (index === rowWithProductId && section.products) {
              const newSection = {
                ...section,
                products: section.products.filter((p) => p.id !== productId),
              };
              return newSection;
            }
            return section;
          })
        );
      } else if (products.some((p) => p.id === productId)) {
        setProducts((prevProducts) =>
          prevProducts.filter((p) => p.id !== productId)
        );
      }
      setProductId(undefined);
      setProductIsRemovable(false);
      setRowWithProductId(undefined);
    }
  }, [
    productIsRemovable,
    productId,
    products,
    rowWithProductId,
    setSections,
    setProducts,
  ]);

  useEffect(() => {
    if (productsToBeSaved.length > 0) {
      setProducts((prevProducts) => [...prevProducts, ...productsToBeSaved]);
      setProductsToBeSaved([]);
    }
  }, [productsToBeSaved, setProducts]);

  return (
    <SectionsContext.Provider
      value={{
        sections,
        products,
        isDragging,
        handleProductDragStart,
        handleProductDrag,
        handleProductDragEnd,
        handleProductDragOver,
        handleProductDrop,
        handleProductDragLeave,
        updateSectionAligment,
        removeSection,
        moveSectionToTop,
        moveSectionUp,
        moveSectionDown,
        moveSectionToBottom,
        zoom,
        setZoom,
        removeProductFromProductsList,
        removeProductFromSection,
        addRow,
        addNewProduct,
        addProductModal,
        setAddProductModal,
      }}
    >
      {children}
    </SectionsContext.Provider>
  );
};

export function useSections() {
  const context = useContext(SectionsContext);
  return context;
}

export default SectionsProvider;
