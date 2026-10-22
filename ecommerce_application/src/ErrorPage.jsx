
import React from "react";
import "./App.css";

function ErrorPage({ code, message }) {
  const is404 = Number(code) === 404;

  return (
    <div className="error-page">
      <div className="error-box">
        <div className="error-illustration">
          {is404 ? (
            <svg
              viewBox="0 0 200 130"
              role="img"
              aria-label="Page not found illustration"
            >
              <path
                d="M20 110 H180"
                stroke="#dbe5ff"
                strokeWidth="3"
              />
              <path
                d="M100 20 V110"
                stroke="#243b70"
                strokeWidth="8"
                strokeLinecap="round"
              />
              <path
                d="M100 22 L165 38 L100 55 Z"
                fill="#3568dc"
              />
              <text
                x="120"
                y="43"
                fontSize="16"
                fill="white"
                fontWeight="bold"
                textAnchor="middle"
              >
                404
              </text>
              <circle cx="40" cy="35" r="12" fill="#e8efff" />
              <circle cx="160" cy="85" r="10" fill="#e8efff" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 200 130"
              role="img"
              aria-label="Server error illustration"
            >
              <rect
                x="48"
                y="15"
                width="100"
                height="28"
                rx="6"
                fill="#243b70"
              />
              <rect
                x="48"
                y="48"
                width="100"
                height="28"
                rx="6"
                fill="#3568dc"
              />
              <rect
                x="48"
                y="81"
                width="100"
                height="28"
                rx="6"
                fill="#243b70"
              />
              <circle cx="60" cy="29" r="3" fill="#a8c4ff" />
              <circle cx="70" cy="29" r="3" fill="#a8c4ff" />
              <circle cx="60" cy="62" r="3" fill="#a8c4ff" />
              <circle cx="70" cy="62" r="3" fill="#a8c4ff" />
              <circle cx="60" cy="95" r="3" fill="#a8c4ff" />
              <path
                d="M151 62 L181 113 H121 Z"
                fill="#ed5145"
              />
              <text
                x="151"
                y="99"
                fontSize="27"
                fill="white"
                fontWeight="bold"
                textAnchor="middle"
              >
                !
              </text>
            </svg>
          )}
        </div>

        <h1 className="error-code">{code}</h1>
        <h2 className="error-title">{message}</h2>

        <p className="error-description">
          {is404
            ? "The page you are looking for doesn't exist or may have been moved."
            : "Something went wrong while loading the products. Please try again later."}
        </p>

        <button
          className="error-retry"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>

        <p className="error-footer">
          ShopZone | Error Handling
        </p>
      </div>
    </div>
  );
}

export default ErrorPage;
