import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Form, Button } from "react-bootstrap";
import "../../styles/home.scss";

export const Login = () => {

  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const token = store.token;
  // const token = sessionStorage.getItem("token");
  const current_user = store.current_user;

  const login = () => {
    actions.login(email, password);
  };

  return (
    <div className="text-center mt-5">
      <h1>Login Page</h1>
      {token && token != "" && token != "undefined" ? (
        <h5 className="text-danger">
          Usted ha iniciado sesión como {current_user} with token: {token}
        </h5>
      ) : (
        <Form className="form-login p-4 rounded">
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
          <Button variant="primary" onClick={login}>
            Enviar
          </Button>
        </Form>
      )}
    </div>
  );
};
