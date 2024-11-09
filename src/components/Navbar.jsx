import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

// styles & images
import "./Navbar.css";
import Temple from "../assets/temple.svg";

export default function Navbar() {
  const { logout, isPending } = useLogout();
  const { user } = useAuthContext();

  return (
    <nav className="navbar">
      <ul>
        <li className="logo">
          <Link to="/">
            <div className="logo-content">
              <img src={Temple} alt="dojo logo" />
              <span>MiManage</span>
            </div>
          </Link>
        </li>

        {!user && (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
        {!user && (
          <li>
            <Link to="/signup">Signup</Link>
          </li>
        )}
        {user && (
          <li>
            <button className="btn" onClick={logout} disabled={isPending}>
              {isPending ? "Logging out..." : "Logout"}
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
