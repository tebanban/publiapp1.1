import React, { useState } from "react";
import "../../styles/app.scss";
import { Table_valla } from "../component/table_valla";

export const App = () => {
  const [tableBox, setTableBox] = useState(<Table_valla />);

  return (
    <div className="appBox">
      <div className="appNav my-2">
        <button
          onClick={() => setTableBox(<Table_valla />)}
          className="btn btn-primary mx-2"
        >
          Vallas
        </button>

        <button className="btn btn-secondary mx-2">Clientes</button>

        <button className="btn btn-secondary mx-2">Propietarios</button>

        <button className="btn btn-secondary mx-2">Usuarios</button>
      </div>

      <div>{tableBox}</div>
    </div>
  );
};
