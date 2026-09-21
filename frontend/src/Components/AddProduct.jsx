import { useRef } from "react";

const AddProduct = ({ handleAddProduct }) => {
  const pnameRef = useRef(null);
  const pImgRef = useRef(null);
  const pPriceRef = useRef(null);
  const pMfgRef = useRef(null);
  const pQtyRef = useRef(null);
  const pDescRef = useRef(null);

  const resetForm = () => {
    if (pnameRef.current) pnameRef.current.value = "";
    if (pImgRef.current) pImgRef.current.value = "";
    if (pPriceRef.current) pPriceRef.current.value = "";
    if (pMfgRef.current) pMfgRef.current.value = "";
    if (pQtyRef.current) pQtyRef.current.value = "";
    if (pDescRef.current) pDescRef.current.value = "";
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const productName = pnameRef.current?.value.trim() || "";
    const image = pImgRef.current?.value.trim() || "";
    const price = Number(pPriceRef.current?.value) || 0;
    const quantity = Number(pQtyRef.current?.value) || 0;
    const description = pDescRef.current?.value.trim() || "";
    const manufacturer = pMfgRef.current?.value.trim() || "";

    const productData = {
      pname: productName,
      image,
      price,
      qty: quantity,
      desc: description,
      manufacturer,
    };

    if (typeof handleAddProduct !== "function") {
      console.error("handleAddProduct prop was not provided.");
      return;
    }

    handleAddProduct(productData);
    resetForm();
  };

  return (
    <form className="addPform" onSubmit={handleSubmit}>
      <h2>Add New Product</h2>

      <div className="form-field">
        <label htmlFor="product-name">Product Name</label>
        <input
          id="product-name"
          type="text"
          placeholder="Example: Apple"
          ref={pnameRef}
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="product-image">Image URL</label>
        <input
          id="product-image"
          type="url"
          placeholder="https://example.com/product-image.jpg"
          ref={pImgRef}
        />
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="product-price">Price</label>
          <input
            id="product-price"
            type="number"
            placeholder="Example: 99"
            ref={pPriceRef}
            min="0"
            step="0.01"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="product-quantity">Quantity</label>
          <input
            id="product-quantity"
            type="number"
            placeholder="Example: 10"
            ref={pQtyRef}
            min="0"
            step="1"
            required
          />
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="product-manufacturer">Manufacturer</label>
        <input
          id="product-manufacturer"
          type="text"
          placeholder="Example: Fresh Farms"
          ref={pMfgRef}
        />
      </div>

      <div className="form-field">
        <label htmlFor="product-description">Description</label>
        <textarea
          id="product-description"
          placeholder="Write a short product description..."
          ref={pDescRef}
          rows="4"
        />
      </div>

      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProduct;