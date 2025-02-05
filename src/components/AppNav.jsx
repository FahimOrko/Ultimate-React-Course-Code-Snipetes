import { NavLink } from "react-router-dom";
import styles from "./AppNav.module.css";

export const AppNav = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to="cities">City</NavLink>
        </li>
        <li>
          <NavLink to="countries">Country</NavLink>
        </li>
      </ul>
    </nav>
  );
};
