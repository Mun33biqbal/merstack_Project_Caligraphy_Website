import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const { cart, removeFromCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ maxWidth: "800px", margin: "50px auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Your Shopping Cart</h1>
      {cart.length === 0 ? (
        <div style={{ textAlign: "center" }}>
          <p>Your cart is empty.</p>
          <Link to="/products" className="cta-button">Start Shopping</Link>
        </div>
      ) : (
        <div>
          {cart.map(item => (
            <div key={item._id} className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", padding: "20px" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img src={item.image || "https://via.placeholder.com/100x100?text=Art"} alt={item.title} style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "10px", marginRight: "20px" }} />
                <div>
                  <h3>{item.title}</h3>
                  <p>${item.price}</p>
                </div>
              </div>
              <button onClick={() => removeFromCart(item._id)} style={{ background: "#e74c3c" }}>Remove</button>
            </div>
          ))}
          <div style={{ textAlign: "right", marginTop: "30px" }}>
            <h2>Total: ${total}</h2>
            <Link to="/checkout" className="cta-button" style={{ marginTop: "20px" }}>Proceed to Checkout</Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
