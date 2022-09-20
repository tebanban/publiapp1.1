import React, { useState } from "react";
import "../../styles/app.scss";
import { Link } from "react-router-dom";
import { Table_valla } from "../component/table_valla";

export const App = () => {
  const [tableBox, setTableBox] = useState();

  return (
    <div>
      <nav className="navbar navbar-light  mb-3">
        <div className="ml-auto">
          <button
            onClick={() => setTableBox(Table_valla)}
            className="btn btn-primary mx-2"
          >
            Vallas
          </button>

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
    </div>
  );
};
