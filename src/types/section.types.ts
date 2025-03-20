export interface SectionsProviderI {
  children: React.ReactNode;
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

export interface HandleProductDragStartI {
  (e: React.DragEvent<HTMLDivElement>, id: number): void;
}

export interface HandleProductDropI {
  (e: React.DragEvent<HTMLDivElement>, rowIndex: number): void;
}

export interface UpdateSectionAligmentI {
  (value: SectionAligmentT, index: number): void;
}

export interface RemoveSectionI {
  (index: number): void;
}

export interface MoveSectionToTopI {
  (index: number): void;
}

export interface MoveSectionUpI {
  (index: number): void;
}

export interface MoveSectionDownI {
  (index: number): void;
}

export interface MoveSectionToBottomI {
  (index: number): void;
}

export interface RemoveProductFromProductsListI {
  (id: number): void;
}

export interface RemoveProductFromSectionI {
  (id: number): void;
}

export interface AddNewProductI {
  (e: React.MouseEvent<HTMLButtonElement>, data: Omit<ProductI, "id">): void;
}

export interface SectionsContextI {
  sections: SectionI[];
  products: ProductI[];
  zoom: string;
  addProductModal: boolean;
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
  setZoom?: (zoom: string) => void;
  removeProductFromProductsList?: RemoveProductFromProductsListI;
  removeProductFromSection?: RemoveProductFromSectionI;
  addRow?: () => void;
  addNewProduct?: AddNewProductI;
  setAddProductModal?: (value: boolean) => void;
}
