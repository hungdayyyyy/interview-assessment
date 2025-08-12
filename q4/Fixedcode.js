import React, { useState, useEffect } from "react";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load products");
        setLoading(false);
      });
  }, []);

  const lowerFilter = filter.toLowerCase();
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(lowerFilter)
  );

  return (
    <div>
      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Search products..."
        aria-label="Search products"
      />

      {loading && <div>Loading...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}

      {!loading &&
        !error &&
        filteredProducts.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ccc",
              margin: "10px",
              padding: "10px",
            }}
          >
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <img
              src={product.image}
              alt={product.name}
              style={{ width: "100px" }}
            />
          </div>
        ))}
    </div>
  );
}

export default ProductList;
