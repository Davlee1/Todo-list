import { NavLink } from "react-router";
import styles from "./Header.module.css";

const Header = function ({ title }) {
  return (
    <>
      <div className={styles.Header}>
        <nav>
          <NavLink
            to={"/"}
            className={({ isActive }) => {
              return isActive ? styles.active : styles.inactive;
            }}
          >
            Home
          </NavLink>
          <NavLink
            to={"/about"}
            className={({ isActive }) => {
              return isActive ? styles.active : styles.inactive;
            }}
          >
            About
          </NavLink>

          <h1>{title}</h1>
        </nav>
      </div>
      <div className={styles.BottomBorder}></div>
    </>
  );
};
export default Header;
