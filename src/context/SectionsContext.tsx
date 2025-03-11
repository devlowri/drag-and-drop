"use client";
import React, { createContext, useContext, useRef, useState } from "react";

interface SectionsProviderI {
  children: React.ReactNode;
}

interface SectionsContextI {
  sections: SectionI[];
  products: ProductI[];
  isDragging?: boolean;
  handleProductDragStart?: HandleProductDragStartI;
  handleProductDrag?: (e: React.DragEvent<HTMLDivElement>) => void;
  handleProductDragEnd?: () => void;
  handleProductDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
  handleProductDrop?: HandleProductDropI;
  handleProductDragLeave?: (e: React.DragEvent<HTMLDivElement>) => void;
  updateSectionAligment?: UpdateSectionAligmentI;
  removeSection?: RemoveSectionI;
  moveSectionToTop?: MoveSectionToTopI;
  moveSectionUp?: MoveSectionUpI;
  moveSectionDown?: MoveSectionDownI;
  moveSectionToBottom?: MoveSectionToBottomI;
  zoom: string;
  setZoom?: (zoom: string) => void;
}

export interface SectionI {
  products?: ProductI[];
  alignment?: SectionAligmentT;
}

export type SectionAligmentT = "left" | "center" | "right";

export interface ProductI {
  id: number;
  image: string;
  name: string;
  price: number;
}

interface HandleProductDragStartI {
  (e: React.DragEvent<HTMLDivElement>, id: number): void;
}

interface HandleProductDropI {
  (e: React.DragEvent<HTMLDivElement>, rowIndex: number): void;
}

interface UpdateSectionAligmentI {
  (value: SectionAligmentT, index: number): void;
}

interface RemoveSectionI {
  (index: number): void;
}

interface MoveSectionToTopI {
  (index: number): void;
}

interface MoveSectionUpI {
  (index: number): void;
}

interface MoveSectionDownI {
  (index: number): void;
}

interface MoveSectionToBottomI {
  (index: number): void;
}

const SectionsContext = createContext<SectionsContextI>({
  sections: [],
  products: [],
  zoom: "100",
});

export const PRODUCTS_PER_SECTION = 3;

const SectionsProvider = ({ children }: SectionsProviderI) => {
  const [sections, setSections] = useState<SectionI[]>([
    { alignment: "left" },
    { alignment: "left" },
    { alignment: "left" },
    { alignment: "left" },
    { alignment: "left" },
  ]);
  const [products, setProducts] = useState<ProductI[]>([
    {
      id: 0,
      image:
        "https://static.zara.net/assets/public/209a/2046/91d14d79bf5a/9d61c5362637/06840055400-p/06840055400-p.jpg?ts=1741194260171&w=1746",
      name: "JEANS ZW COLLECTION PALAZZO TIRO ALTO",
      price: 39.95,
    },
    {
      id: 1,
      image:
        "https://static.zara.net/assets/public/69e9/7f9a/c833405eaf8c/f05152cc5061/05216059250-a1/05216059250-a1.jpg?ts=1741261601558&w=829",
      name: "JEANS ZW COLLECTION BARREL TIRO MEDIO",
      price: 39.95,
    },
    {
      id: 2,
      image:
        "https://static.zara.net/assets/public/1580/aecc/784d481696fd/986bdce003f7/08228030427-p/08228030427-p.jpg?ts=1741348627220&w=829",
      name: "JEANS Z1975 STRAIGHT TIRO MEDIO FULL LENGTH",
      price: 29.95,
    },
    {
      id: 3,
      image:
        "https://static.zara.net/assets/public/a2e4/9ba5/3b704728a234/766da360f1bc/07223021620-p/07223021620-p.jpg?ts=1741278368971&w=829",
      name: "JEANS Z1975 SLIM MOM LEG TIRO ALTO",
      price: 39.95,
    },
    {
      id: 4,
      image:
        "https://static.zara.net/assets/public/fc37/9602/d4b840c18734/8a9da0d29855/02382613400-p/02382613400-p.jpg?ts=1741596804962&w=829",
      name: "JEANS ZW COLLECTION PALAZZO TIRO ALTO",
      price: 29.95,
    },
  ]);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState<SectionAligmentT | undefined>(
    undefined
  );
  const [zoom, setZoom] = useState("100");

  const ghostRef = useRef<HTMLDivElement | null>(null);

  const handleProductDragStart: HandleProductDragStartI = (e, id) => {
    setIsDragging(true);
    e.dataTransfer.setDragImage(new Image(), 0, 0);
    e.dataTransfer.setData("id", id.toString());

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

    const productId = e.dataTransfer.getData("id");
    setProductToSectionById(productId, rowIndex);
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

  const setProductToSectionById = (id: string, rowIndex: number) => {
    const parsedId = Number(id);
    if (!isNaN(parsedId)) {
      setSections((prevSections) =>
        prevSections.map((section, index) => {
          if (index === rowIndex) {
            const product = products.find((product) => product.id === parsedId);
            if (!section.products) {
              return {
                ...section,
                products: [product],
              } as SectionI;
            } else {
              return {
                ...section,
                products: (() => {
                  const updatedProducts = [...section.products];
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
        })
      );
    }
  };

  const updateSectionAligment: UpdateSectionAligmentI = (value, index) => {
    setSections((prevSections) =>
      prevSections.map((section, i) =>
        i === index ? { ...section, alignment: value } : section
      )
    );
  };

  const removeSection: RemoveSectionI = (index) => {
    setSections((prevSections) => prevSections.filter((_, i) => i !== index));
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
