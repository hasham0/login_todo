import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import UserContext from "../context/userContext";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

export default function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const token = Cookies.get("Auth_Token");
  const handleLogout = async () => {
    const response = await fetch("http://localhost:7000/Logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      mode: "cors",
    });
    const data = await response.json();
    Cookies.remove("Auth_Token");
    toast.success(data.message);
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 shadow">
      <nav className="border-gray-200 bg-white px-4 py-2.5 lg:px-6">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between capitalize">
          <Link to="/" className="flex items-center">
            home
          </Link>
          <div className="flex items-center lg:order-2">
            {token ? (
              <>
                {pathname === "/profile" ? (
                  <Link
                    to="/todo"
                    className="mr-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-300 lg:px-5 lg:py-2.5"
                  >
                    todo app
                  </Link>
                ) : (
                  <Link
                    to="/profile"
                    className="mr-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-300 lg:px-5 lg:py-2.5"
                  >
                    profle
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="mr-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-300 lg:px-5 lg:py-2.5"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="mr-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-300 lg:px-5 lg:py-2.5"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="mr-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-300 lg:px-5 lg:py-2.5"
                >
                  sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
