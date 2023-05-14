import { NavLink } from "react-router-dom";

import { useAuthentication } from "../hooks/useAuthentication";

import { useAuthValue } from "../context/Authcotext";

//CSS
import styles from "./Navbar.module.css";

const Navbar = () => {
  const { user } = useAuthValue();
  const {logout} = useAuthentication();

  return (
    <nav className={styles.nav}>
      <NavLink to="/" className={styles.brand}>
        Mini <span>Blog</span>
      </NavLink>
      <ul className={styles.links_list}>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : "")}
            to="/"
          >
            Inicio
          </NavLink>
        </li>

        {!user && (
          <>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? styles.active : "")}
                to="/login"
              >
                Entrar
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? styles.active : "")}
                to="/register"
              >
                Cadastrar
              </NavLink>
            </li>
          </>
        )}
        {user &&(
             <>
             <li>
               <NavLink
                 className={({ isActive }) => (isActive ? styles.active : "")}
                 to="/posts/create"
               >
                 Novo Post
               </NavLink>
             </li>
             <li>
               <NavLink
                 className={({ isActive }) => (isActive ? styles.active : "")}
                 to="/dashBoard"
               >
                 DashBoard
               </NavLink>
             </li>
           </>
        )}
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : "")}
            to="/about"
          >
            Sobre
          </NavLink>
        </li>
        {user && (
          <li>
            <button onClick={logout}>sair</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
