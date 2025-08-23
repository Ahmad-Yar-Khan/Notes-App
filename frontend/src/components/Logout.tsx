import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1. Remove token
    localStorage.removeItem("authToken");

    // 2. Redirect to login
    navigate("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 text-white rounded"
    >
      Logout
    </button>
  );
}

export default LogoutButton;
