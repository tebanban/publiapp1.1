import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Form, Button } from "react-bootstrap";
import "../../styles/home.scss";

function LoginForm() {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { token } = store;
  const { user_name } = store;
  const { user } = store;

  const login = (e) => {
    actions.login(email, password);
  };

  return (
    <div className="text-center my-3">
      {token && token != "" && token != "undefined" ? (
        <h5 className="text-danger">
          Bienvenido: {user_name} como {user.role}
  
        </h5>
      ) : (
        <Form className="form-login p-4 rounded">
          <h3>Please Login</h3>
          <Form.Group className=" my-2">
            <input
              className="form-control"
              type="text"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            ></input>
          </Form.Group>
          <Form.Group className=" my-2">
            <input
              className="form-control"
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            ></input>
          </Form.Group>
          <Button variant="primary" onClick={login}>
            Iniciar Sesión
          </Button>
        </Form>
      )}
    </div>
  );
}

export default LoginForm;
