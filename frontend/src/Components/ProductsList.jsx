import ProductCard from "./ProductCard";

const ProductList = ({ allProducts, handleDelete, handleAddToCart }) => {
  return (
    <div className="red">
      <h1>All Products</h1>

      <div className="container">
        {allProducts?.map((prod) => {
          return (
            <ProductCard
              key={prod.id}
              data={prod}
              handleDelete={handleDelete}
              handleAddToCart={handleAddToCart}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;