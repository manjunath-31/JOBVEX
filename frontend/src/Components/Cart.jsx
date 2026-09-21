const Cart = ({ items = [], onRemove, onChangeQuantity }) => {
  let total = items.reduce(
    (sum, item) => sum + Number(item.price || 0) * item.quantity,
    0
  );

  return (
    <section className="cart" aria-labelledby="cart-title">
      <div className="cart-heading">
        <h2 id="cart-title">Shopping Cart</h2>
        <span>{items.length} item{items.length === 1 ? "" : "s"}</span>
      </div>

      {items.length === 0 ? (
        <p className="cart-empty">Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {items.map((item) => {
              let name = item.pname || item.title || "Untitled product";
              let price = Number(item.price || 0);

              return (
                <article className="cart-item" key={item.id}>
                  <div>
                    <strong>{name}</strong>
                    <span>₹{price.toLocaleString("en-IN")} each</span>
                  </div>

                  <div className="quantity-controls">
                    <button
                      type="button"
                      onClick={() => onChangeQuantity(item.id, item.quantity - 1)}
                      aria-label={`Decrease quantity of ${name}`}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => onChangeQuantity(item.id, item.quantity + 1)}
                      aria-label={`Increase quantity of ${name}`}
                    >
                      +
                    </button>
                    <button
                      type="button"
                      className="remove-button"
                      onClick={() => onRemove(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="cart-total">
            <strong>Total</strong>
            <strong>₹{total.toLocaleString("en-IN")}</strong>
          </div>
        </>
      )}
    </section>
  );
};

export default Cart;
