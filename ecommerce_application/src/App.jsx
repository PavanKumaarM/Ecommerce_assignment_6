
import React, { useState, useEffect } from "react";
import "./App.css";
import ErrorPage from "./ErrorPage";

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [errorCode, setErrorCode] = useState(0);

  const itemsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response =
        await fetch(
          "https://dummyjson.com/products?limit=100"
        );

        if (response.status === 404) {
          setErrorCode(404);
          setLoading(false);
          return;
        }

        if (response.status >= 500) {
          setErrorCode(500);
          setLoading(false);
          return;
        }

        if (!response.ok) {
          setErrorCode(response.status);
          setLoading(false);
          return;
        }

        const result = await response.json();

        setData(result.products);
        setLoading(false);

        console.log("Status Code:", response.status);
        console.log("Products:", result.products.length);
      } catch (error) {
        setErrorCode(500);
        setLoading(false);
        console.log("API Error:", error);
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter((item) =>
    item.title
      .toLowerCase()
      .includes(search.trim().toLowerCase())
  );

  const totalPages = Math.ceil(
    filteredData.length / itemsPerPage
  );

  const startIndex = (page - 1) * itemsPerPage;

  const currentProducts = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  
  if (loading) {
    return (
      <h2 className="message">Loading products...</h2>
    );
  }

  if (errorCode !== 0) {
    return (
      <ErrorPage
        code={errorCode}
        message={
          errorCode === 404
            ? "Page Not Found"
            : errorCode >= 500
            ? "Internal Server Error"
            : "Unable to load products"
        }
      />
    );
  }

  return (
    <div className="container">
      
<header className="header">
  <div className="header-top">
    <div className="brand">
      <div className="brand-icon">S</div>

      <div className="brand-text">
        <h1>
          Shop<span>Zone</span>
        </h1>
        <p>SHOP SMART. LIVE BETTER.</p>
      </div>
    </div>

    <div className="header-tagline">
      <span className="eyebrow">DISCOVER · COMPARE · SHOP</span>
      <h2>
        Find Your <span>Favourite</span> Products
      </h2>
      <p>Best quality products at the best prices.</p>
    </div>
  </div>

  <div className="header-search">
    <span className="search-icon">⌕</span>

    <input
      type="text"
      placeholder="Search products..."
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
        setPage(1);
      }}
    />

    {search && (
      <button
        className="header-clear"
        onClick={() => {
          setSearch("");
          setPage(1);
        }}
      >
        ✕
      </button>
    )}
  </div>
</header>


      
      <div className="search-container">
        {search !== "" && (
          <button
            className="clear-button"
            onClick={() => {
              setSearch("");
              setPage(1);
            }}
          >
            Clear
          </button>
        )}
      </div>

      
      {filteredData.length > 0 && (
        <p className="result-count">
          Showing {filteredData.length} product(s)
          {search.trim() !== "" && (
            <> for "{search}"</>
          )}
        </p>
      )}

      
      {filteredData.length > 0 ? (
        <>
          <div className="product-grid">
            {currentProducts.map((item) => (
              <div className="product-card" key={item.id}>
                <div className="image-container">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                  />
                </div>

                <h2>{item.title}</h2>

                <p className="category">
                  {item.category}
                </p>

                <p className="description">
                  {item.description}
                </p>

                <p className="rating">
                  ⭐ {item.rating} / 5
                </p>

                <h3 className="price">
                  ${item.price.toFixed(2)}
                </h3>

                <button
                  className="buy-button"
                  onClick={() =>
                    alert("Selected product: " + item.title)
                  }
                >
                  View Product
                </button>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </button>

            <span>
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <div className="empty-state">
          <img
            src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png"
            alt="No products found"
          />

          <h2>No Products Found</h2>

          <p>
            We couldn't find any products matching
            "{search}".
          </p>

          <button
            onClick={() => {
              setSearch("");
              setPage(1);
            }}
          >
            Show All Products
          </button>
        </div>
      )}

      <footer className="footer">
        ShopZone | React E-commerce Demo
      </footer>
    </div>
  );
}

export default App;
