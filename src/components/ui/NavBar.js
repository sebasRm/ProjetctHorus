import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/auth";

export const NavBar = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logout());
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/home">
            Home
          </Link>

          <div className="d-flex justify-content-end btn-collapse">
            <div className="navbar-collapse" id="navbarScroll">
              {/*
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
                */}

              <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    id="offcanvasNavbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Jesse White
                  </a>
                  <ul
                    class="dropdown-menu"
                    aria-labelledby="offcanvasNavbarDropdown"
                  >
                    <li>
                      <a class="dropdown-item" href="#">
                        Ultima conexión: 17/02/2022
                      </a>
                    </li>
                    <li>
                      <hr class="dropdown-divider" />
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        Fecha de expiracion de contraseña: 17/03/22
                      </a>
                      <li>
                        <a class="dropdown-item" href="#" onClick={handleClick}>
                          Cerrar sesion
                        </a>
                      </li>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
