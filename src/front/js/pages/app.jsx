import React, { useState } from "react";
import "../../styles/index.scss";
import { Table_valla } from "../module_valla/table_valla";
import { Table_owner } from "../module_owner/table_owner";
import { Table_client } from "../module_client/table_client";
import { Sidebar } from "../component/sidebar";
import { Tab, Tabs } from "react-bootstrap/";

export const App = () => {
  const [tableBox, setTableBox] = useState("vallas");
  console.log(tableBox);

  return (
    <div className="appBox">
      <Sidebar />

      <Tabs id="controlled-tab-example" activeKey={tableBox} onSelect={(k) => setTableBox(k)} className="mb-3">
        <Tab eventKey="vallas" title="Vallas">
          <Table_valla />
        </Tab>
        <Tab eventKey="propietarios" title="Propietarios">
          <Table_owner />
        </Tab>
        <Tab eventKey="clients" title="Clientes">
          <Table_client />
        </Tab>
        <Tab eventKey="users" title="Usuarios" disabled>
          user content
        </Tab>
      </Tabs>
    </div>
  );
};
