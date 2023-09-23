import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Form, Button } from "react-bootstrap";

export const UserProfile = () => {
  const { store, actions } = useContext(Context);
  const { user } = store;
  const { user_email } = store;
  const { user_name } = store;
  console.log("user email: ", user_email, "user name: ", user_name, "user:", user);

  const [editUser, setEditUser] = useState();
  const handleInputChange = (e) => {
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  };

  const submitUser = (e) => {
    e.preventDefault();
    actions.updateUser(id, editUser.name, editUser.email, editUser.password);
  };

  const deleteUser = () => {
    actions.deleteUser(user.id);
  };

  return (
    <Form className="text-center form form-login ">
      <h3>Perfil de Usuario</h3>
      <Form.Group className="form-group  my-2">
        
        <input
          defaultValue={user.name}
          className="form-control"
          id="name"
          maxLength="150"
          name="name"
          required=""
          type="text"
          onChange={handleInputChange}
          autoComplete="name"
        />
      </Form.Group>

      <Form.Group className="form-group my-2">
        <input
          defaultValue={user.email}
          className="form-control"
          id="email"
          maxLength="150"
          name="email"
          required=""
          type="text"
          onChange={handleInputChange}
          autoComplete="email"
        />
      </Form.Group>
      <Form.Group className="form-group my-2">
        <input
          defaultValue={user.password}
          className="form-control"
          id="password"
          maxLength="150"
          name="password"
          required=""
          type="password"
          onChange={handleInputChange}
          autoComplete="password"
        />
      </Form.Group>

      <Button variant="primary" onClick={submitUser}>
        Actualizar
      </Button>
      <Button variant="danger" className="mx-3" onClick={deleteUser}>
        Eliminar Cuenta
      </Button>
    </Form>
  );
};
