import React, { useState } from "react";
import "../../styles/index.scss";
import { Table_valla } from "../module_valla/table_valla";
import { Table_owner } from "../module_owner/table_owner";

export const App = () => {
  const [tableBox, setTableBox] = useState('Table_valla');
  console.log(tableBox)

  return (
    <div className="appBox">
      <div className="appNav my-2">
        <button onClick={() => setTableBox('Table_valla')} className={tableBox == 'Table_valla' ? "btn btn-primary mx-2" : "btn btn-secondary mx-2"}>
          Vallas
        </button>

        <button onClick={() => setTableBox('Table_client')} className={tableBox == 'Table_client' ? "btn btn-primary mx-2" : "btn btn-secondary mx-2"}>
          Clientes
        </button>

        <button onClick={() => setTableBox('Table_owner')} className={tableBox == 'Table_owner' ? "btn btn-primary mx-2" : "btn btn-secondary mx-2"}>
          Propietarios
        </button>

        <button onClick={() => setTableBox('Table_format')} className={tableBox == 'Table_format' ? "btn btn-primary mx-2" : "btn btn-secondary mx-2"}>
          Formatos
        </button>
      </div>

      <div>{tableBox === 'Table_valla' && <Table_valla />}
      {tableBox === 'Table_client' && <Table_client />}
        {tableBox === 'Table_owner' && <Table_owner />}
        {tableBox === 'Table_format' && <Table_format />}</div>
    </div>
  );
};
