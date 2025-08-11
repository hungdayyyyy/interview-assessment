import { Link } from "react-router-dom";
import ROUTER from "src/router";

/**
 * 404 Not Found component
 */
const NotFound = () => {
  return (
    <div
      style={{
        padding: "20px",
        textAlign: "center",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>

      <Link
        to={ROUTER.HOME}
        style={{
          display: "inline-block",
          backgroundColor: "#3498db",
          color: "white",
          padding: "12px 24px",
          textDecoration: "none",
          borderRadius: "4px",
          marginTop: "20px",
        }}
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
