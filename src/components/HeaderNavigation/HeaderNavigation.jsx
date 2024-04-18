import { NavLink, Outlet } from "react-router-dom";
import css from "./HeaderNavigation.module.css";
import clsx from "clsx";

const HeaderNavigation = () => {
  const linkActive = ({ isActive }) => {
    return clsx(css.navlink, isActive && css.active);
  };

  return (
    <div>
      <header className={css.header}>
        <NavLink to="/" className={linkActive}>
          Home
        </NavLink>
        <NavLink to="/movies" className={linkActive}>
          Movies
        </NavLink>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default HeaderNavigation;