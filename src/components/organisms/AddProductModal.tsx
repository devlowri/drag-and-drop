import { useSections } from "@/context/SectionsContext";
import Modal from "../molecules/Modal";
import { useEffect, useState } from "react";

const AddProductModal = () => {
  const { addNewProduct, addProductModal, setAddProductModal } = useSections();

  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const file = files[0];

      if (file && file.type.startsWith("image/")) {
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
      } else {
        alert("Por favor, selecciona una imagen válida.");
      }
    }
  };

  const submitForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (addNewProduct && name && price && image) {
      const parsedPrice = parseFloat(price);
      if (!isNaN(parsedPrice)) {
        addNewProduct(e, { name, price: parsedPrice, image });
      }
    }
  };

  useEffect(() => {
    if (addProductModal === false) {
      setName("");
      setPrice("");
      setImage(null);
    }
  }, [addProductModal]);

  return (
    <Modal open={addProductModal}>
      <div className="addProductModal">
        <h2 className="addProductModalTitle">Add product</h2>
        <form className="addProductModalForm">
          <label>
            Name
            <input
              type="text"
              required
              placeholder="Introduce el nombre del producto"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </label>
          <label>
            Price
            <input
              type="number"
              min="0.01"
              step="0.01"
              required
              placeholder="Introduce el precio del producto"
              value={price}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                if (isNaN(value)) return;
                setPrice(e.target.value);
              }}
            ></input>
          </label>
          <label>
            Image
            <input
              type="file"
              accept="image/*"
              required
              onChange={handleImageChange}
            ></input>
          </label>

          <div className="addProductModalFormCTA">
            <button
              onClick={() => {
                if (setAddProductModal) setAddProductModal(false);
              }}
              className="sectionRowButton"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={submitForm}
              className="sectionRowButton"
            >
              Create product
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddProductModal;
