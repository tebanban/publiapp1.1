import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Form, Button } from "react-bootstrap";
import "../../styles/home.scss";
import { SettingsSystemDaydreamTwoTone } from "@mui/icons-material";

export const Register = () => {
  const { store, actions } = useContext(Context);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [role, setRole] = useState();

  const register = () => {
    actions.register(name, email, password, role);
  };

  return (
    <div className="text-center my-3">
      <Form className="form-login p-4 rounded">
        <h3>Please Register</h3>
        <Form.Group className=" my-2">
          <input
            className="form-control"
            type="text"
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
          ></input>
        </Form.Group>
        <Form.Group className=" my-2">
          <input
            className="form-control"
            type="text"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </Form.Group>
        <Form.Group className=" my-2">
          <input
            className="form-control"
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </Form.Group>
        <Form.Group className=" my-2">
          <input
            className="form-control"
            type="text"
            placeholder="role"
            onChange={(e) => setRole(e.target.value)}
          ></input>
        </Form.Group>
        <Button variant="primary" onClick={register}>
          Enviar
        </Button>
      </Form>
    </div>
  );
};
