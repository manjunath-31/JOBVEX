const ProductCard = ({ data, handleDelete, handleAddToCart }) => {
  const { pname, title, image, price, desc, id } = data || {};
  const displayTitle = pname || title || "Untitled product";
  const displayImage = image;
  const displayDesc = desc;

  return (
    <div className="card">
      {displayImage ? <img src={displayImage} alt={displayTitle} /> : null}
      <h2>{displayTitle}</h2>
      {price !== undefined && <span>₹{Number(price).toLocaleString("en-IN")}</span>}
      {displayDesc ? <p>{displayDesc}</p> : null}
      <div className="card-actions">
        <button type="button" onClick={() => handleAddToCart(data)}>Add to cart</button>
        <button type="button" onClick={() => handleDelete(id)}>Delete</button>
      </div>
    </div>
  );
};

export default ProductCard;
