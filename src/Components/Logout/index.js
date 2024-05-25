import React from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();  // Correct use of the navigation hook

  const token = localStorage.getItem("accessToken");

  async function userLogout(e) {
    e.preventDefault();
    if (token) {
      localStorage.clear();
      navigate("/login");  // Redirect to login page after logout
    }
  }

  return (
    <form onSubmit={userLogout}>
      <button type="submit" className="logout-button">
        Logout
      </button>
    </form>
  );
}
