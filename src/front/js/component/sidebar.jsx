import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Nav, Navbar } from "react-bootstrap/";
import { Link } from "react-router-dom";
import "../../styles/sidebar.scss";

export const Sidebar = () => {
  const { store, actions } = useContext(Context);
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    actions.setSidebarState(isOpen);
    console.log(isOpen)
  };

  return (
    <div className={`sidebar ${isOpen ? "" : "minimized"}`}>
      <div className="toggle-container">
        <button className="toggle-button" onClick={toggleSidebar}>
          {isOpen ? "Menú" : <i className="fa fa-bars mx-2" aria-hidden="true" />}
        </button>
      </div>

      <Navbar expand="lg" variant="light">
        <Navbar.Toggle aria-controls="sidebar-nav" onClick={toggleSidebar} />
        <Navbar.Collapse id="sidebar-nav">
          <Nav className="flex-column">
            <Link to="/app">
              <button className="btn btn-primary mx-2">App</button>
            </Link>
            <Nav.Link href="/">{isOpen ? "About" : "A"}</Nav.Link>
            <Nav.Link href="/app">{isOpen ? "Contact" : "C"}</Nav.Link>
            <Nav.Link href="/app">{isOpen ? "Dash" : "D"}</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};
