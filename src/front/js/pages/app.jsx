import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/index.scss";
import { Table_valla } from "../module_valla/table_valla";
import { Table_owner } from "../module_owner/table_owner";
import { Table_client } from "../module_client/table_client";
import { Sidebar } from "../component/sidebar";
import { Tab, Tabs } from "react-bootstrap/";

export const App = () => {
  const [tableBox, setTableBox] = useState("vallas");
  const { store, actions } = useContext(Context);
  const isOpen = store.sidebarState;
  const { getVallas } = actions;
  const { getOwners } = actions;
  const { getClients } = actions;

  // State to track whether data is loaded
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    // Fetch data and set the dataLoaded state when data is loaded
    const fetchData = async () => {
      await Promise.all([getVallas(), getOwners(), getClients()]);
      setDataLoaded(true);
    };

    fetchData();
    console.log("App Render");
  }, [getVallas, getOwners, getClients]);

  return (
    <div className={`appBox ${isOpen ? "extended" : ""}`}>
      <Sidebar />

      {dataLoaded ? (
        <Tabs id="controlled-tab-example" activeKey={tableBox} onSelect={(k) => setTableBox(k)} className="mb-3">
          <Tab eventKey="vallas" title="Vallas">
            <Table_valla />
          </Tab>
          <Tab eventKey="owners" title="Propietarios">
            <Table_owner />
          </Tab>
          <Tab eventKey="clients" title="Clientes">
            <Table_client />
          </Tab>
          <Tab eventKey="users" title="Usuarios" disabled>
            {/* user content */}
          </Tab>
        </Tabs>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
