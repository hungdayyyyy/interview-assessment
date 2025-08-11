import { Link } from "react-router-dom";
import ROUTER from "src/router";
const Dashboard = () => {
  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Dashboard</h1>
      <p>Welcome to the application dashboard!</p>

      <div style={{ marginTop: "30px" }}>
        <Link
          to={ROUTER.USER_PROFILE}
          style={{
            display: "inline-block",
            backgroundColor: "#27ae60",
            color: "white",
            padding: "12px 24px",
            textDecoration: "none",
            borderRadius: "4px",
          }}
        >
          User Profile
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
