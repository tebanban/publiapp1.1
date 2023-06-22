import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import logoNav from "../../img/logo-nav.png";
import { Nav, Navbar } from "react-bootstrap/";
import "../../styles/sidebar.scss";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div className={`sidebar ${isOpen ? '' : 'hidden'}`}>
      <div className="toggle-container">
        <button className="toggle-button" onClick={toggleSidebar}>
          {isOpen ? 'Hide' : 'Show'}
        </button>
      </div>
      
      <Navbar expand="lg" variant="light">
        <Navbar.Toggle aria-controls="sidebar-nav" onClick={toggleSidebar}/>
        <Navbar.Collapse id="sidebar-nav">
          <Nav className="flex-column">
            <Nav.Link href="/vallas">Vallas</Nav.Link>
            <Nav.Link href="/">About</Nav.Link>
            <Nav.Link href="/app">Services</Nav.Link>
            <Nav.Link href="/app">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      
    </div>
  );
};
