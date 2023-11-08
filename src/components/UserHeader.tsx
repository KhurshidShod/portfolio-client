import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./UserHeader.module.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const UserHeader = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuth } = useContext(AuthContext);
  console.log(location);
  const [userId, setUserId] = useState<string>();
  return (
    <header>
      <div className="container">
        <nav className={styles.navbar}>
          <div>
            <form action="">
              <input
                type="text"
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Enter user id"
                name=""
                id=""
              />
              <button onClick={() => navigate(`user/${userId}`)}>See</button>
            </form>
          </div>
          <div>
            <Link to="/">
              <h1>SharePort</h1>
            </Link>
          </div>
          <div>
            {location.pathname === "/account" && isAuth ? (
              <button>Edit profile</button>
            ) : location.pathname !== "/account" && isAuth ? (
              <button onClick={() => navigate("/account")}>Account</button>
            ) : (
              <button onClick={() => navigate("/login")}>Join us</button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default UserHeader;
