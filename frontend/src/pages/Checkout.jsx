import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

function Checkout() {
  const { cart } = useCart();
  const { user } = useAuth();
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("");

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const submitOrder = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login to place an order");
      return;
    }
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/orders`, {
        products: cart,
        totalAmount: total,
        address,
        payment,
      });
      alert("Order placed successfully!");
    } catch (err) {
      alert("Order failed: " + (err.response?.data?.message || "Unknown error"));
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", padding: "20px" }}>
      <div className="card">
        <div style={{ padding: "30px" }}>
          <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Checkout</h1>
          <div style={{ marginBottom: "30px" }}>
            <h3>Order Summary</h3>
            {cart.map(item => (
              <div key={item._id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <span>{item.title}</span>
                <span>${item.price}</span>
              </div>
            ))}
            <hr />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.2em", fontWeight: "bold" }}>
              <span>Total</span>
              <span>${total}</span>
            </div>
          </div>
          <form onSubmit={submitOrder}>
            <div className="form-group">
              <label>Shipping Address</label>
              <textarea
                value={address}
                onChange={e => setAddress(e.target.value)}
                required
                style={{ width: "100%", minHeight: "100px" }}
              />
            </div>
            <div className="form-group">
              <label>Payment Information</label>
              <input
                type="text"
                placeholder="Card number or payment method"
                value={payment}
                onChange={e => setPayment(e.target.value)}
                required
              />
            </div>
            <button type="submit" style={{ width: "100%", fontSize: "1.2em" }}>Place Order</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Checkout;