import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Form, Button } from "react-bootstrap";
import "../../styles/home.scss";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const sendCredentials = () => {
    actions.sendCredentials(email, password);
  };

  return (
    <div className="text-center mt-5">
      <Form className="form-login p-4 rounded">
        <Form.Group className=" my-2">
          <h1>Login Page</h1>
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
        <Button variant="primary" onClick={sendCredentials}>
          Enviar
        </Button>
      </Form>
    </div>
  );
};
