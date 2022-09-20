import React from "react";
import { Link } from "react-router-dom";



export const AppNavbar = () => {
  return (
    <nav className="navbar navbar-light  mb-3">
        <div className="ml-auto">
          <Link to="/table_vallas">
            <button className="btn btn-secondary mx-2">Vallas</button>
          </Link>
          <Link to="/table_clients">
            <button className="btn btn-secondary mx-2">Clientes</button>
          </Link>
          <Link to="/table_owners">
            <button className="btn btn-secondary mx-2">Propietarios</button>
          </Link>
          <Link to="/table_users">
            <button className="btn btn-secondary mx-2">Usuarios</button>
          </Link>
        </div>
      </nav>
  );
};
