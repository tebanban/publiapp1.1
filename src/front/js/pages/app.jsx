import React, { useState } from "react";
import "../../styles/index.scss";
import { Table_valla } from "../module_valla/table_valla";
import { Table_owner } from "../module_owner/table_owner";

export const App = () => {
  const [tableBox, setTableBox] = useState(<Table_valla />);

  return (
    <div className="appBox">
      <div className="appNav my-2">
        <button onClick={() => setTableBox(<Table_valla />)} className="btn btn-primary mx-2">
          Vallas
        </button>

        <button onClick={() => setTableBox(<Table_client />)} className="btn btn-primary mx-2">
          Clientes
        </button>

        <button onClick={() => setTableBox(<Table_owner />)} className="btn btn-primary mx-2">
          Propietarios
        </button>

        <button onClick={() => setTableBox(<Table_format />)} className="btn btn-primary mx-2">
          Formatos
        </button>
      </div>

      <div>{tableBox}</div>
    </div>
  );
};
