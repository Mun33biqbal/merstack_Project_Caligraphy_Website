import API from "../services/api";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

function AdminDashboard() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (user?.isAdmin) {
      fetchProducts();
      fetchOrders();
      fetchUsers();
    }
  }, [user]);

  const fetchProducts = () => {
    API.get(`/api/products`)
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  };

  const fetchOrders = () => {
    API.get(`/api/orders`)
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  };

  const fetchUsers = () => {
    API.get(`/api/auth/users`)
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  };

  const addProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", parseFloat(price));
    if (image) {
      formData.append("image", image);
    }

    try {
      await API.post(`/api/products`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      fetchProducts();
      setTitle("");
      setDescription("");
      setPrice("");
      setImage(null);
    } catch (err) {
      alert("Failed to add product");
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();
    try {
      await API.post(`/api/auth/change-password`, {
        oldPassword,
        newPassword,
      });
      alert("Password changed successfully!");
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      alert("Failed to change password: " + (err.response?.data?.message || "Unknown error"));
    }
  };

  if (!user?.isAdmin) return <div className="container">Access denied. Admin privileges required.</div>;

  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>

      <div className="grid">
        <div className="card">
          <h3>Total Products</h3>
          <p>{products.length}</p>
        </div>
        <div className="card">
          <h3>Total Orders</h3>
          <p>{orders.length}</p>
        </div>
        <div className="card">
          <h3>Total Users</h3>
          <p>{users.length}</p>
        </div>
      </div>

      <div className="grid">
        <div>
          <h2>Add New Product</h2>
          <form onSubmit={addProduct} className="form-container">
            <div className="form-group">
              <label>Title</label>
              <input value={title} onChange={e => setTitle(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Description</label>
              <input value={description} onChange={e => setDescription(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input type="number" value={price} onChange={e => setPrice(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Image</label>
              <input type="file" onChange={e => setImage(e.target.files[0])} />
            </div>
            <button type="submit">Add Product</button>
          </form>
        </div>

        <div>
          <h2>Change Password</h2>
          <form onSubmit={changePassword} className="form-container">
            <div className="form-group">
              <label>Old Password</label>
              <input type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>New Password</label>
              <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
            </div>
            <button type="submit">Change Password</button>
          </form>
        </div>
      </div>

      <div style={{ marginTop: "40px" }}>
        <h2>Recent Orders</h2>
        {orders.slice(0, 5).map(o => (
          <div key={o._id} className="list-item">
            <p><strong>User:</strong> {o.user?.name || o.user} | <strong>Total:</strong> ${o.totalAmount} | <strong>Status:</strong> {o.status}</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "40px" }}>
        <h2>Recent Users</h2>
        {users.slice(0, 5).map(u => (
          <div key={u._id} className="list-item">
            <p>{u.name} - {u.email} {u.isAdmin ? "(Admin)" : ""}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;