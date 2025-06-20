import { useNavigate } from "react-router-dom";
import { userAuthStore } from "../store/authStore";

const Header = () => {
  const { logout } = userAuthStore();
  const navigate = useNavigate();
  return (
    <div className="w-full relative">
      <div className="w-full h-12 absolute flex flex-row items-center justify-between px-3">
        <div className="text-white">
          <button className="btn btn-ghost" onClick={() => navigate("/")}>
            <strong>SYNTAXY</strong>
          </button>
        </div>
        <div id="mobile-menu" className="block md:hidden">
          <button className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-5 w-5 stroke-current"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>{" "}
            </svg>
          </button>
        </div>
        <div
          id="desktop-menu"
          className="h-full hidden md:flex flex-row items-center gap-2"
        >
          <button className="btn btn-ghost" onClick={() => navigate("/login")}>
            Login
          </button>
          <button
            className="btn btn-ghost"
            onClick={() => navigate("/profile")}
          >
            Profile
          </button>
          <button className="btn btn-ghost">Contact</button>
          <button className="btn btn-ghost">Setting</button>
          <button
            className="btn btn-ghost"
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
