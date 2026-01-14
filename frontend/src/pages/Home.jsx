import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <div className="hero">
        <h1>Calligraphy Art Store</h1>
        <p>Discover exquisite handmade calligraphy masterpieces</p>
        <Link to="/products" className="cta-button">Explore Collection</Link>
      </div>
      <div className="container" style={{ textAlign: "center" }}>
        <h2>Why Choose Our Calligraphy?</h2>
        <div className="grid">
          <div className="card">
            <h3>Handcrafted Excellence</h3>
            <p>Each piece is meticulously created by skilled artisans using traditional techniques.</p>
          </div>
          <div className="card">
            <h3>Unique Designs</h3>
            <p>From classic scripts to modern interpretations, find the perfect calligraphy for your space.</p>
          </div>
          <div className="card">
            <h3>Premium Quality</h3>
            <p>Using the finest inks, papers, and materials to ensure longevity and beauty.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
