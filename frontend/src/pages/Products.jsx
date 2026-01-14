import API from "../services/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get(`/api/products`)
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container">
      <h1>Our Calligraphy Collection</h1>
      <div className="grid">
        {products.map(p => (
          <div key={p._id} className="card">
            <img src={p.image ? `${API.defaults.baseURL}${p.image}`: "https://picsum.photos/300/200"} alt={p.title} />
            <div className="card-content">
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <p>${p.price}</p>
              <Link to={`/product/${p._id}`}>View Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;

