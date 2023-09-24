import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Form, Button, Col, Stack } from "react-bootstrap";

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
    <Form className=" form-login p-4 rounded">
      <h3>Perfil de Usuario</h3>
      <Form.Group as={Col}>
        <Form.Label>Name:</Form.Label>
        <Form.Control
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
      <Form.Group as={Col}>
        <Form.Label>Rol:</Form.Label>
        <Form.Control
          defaultValue={user.role}
          className="form-control"
          id="role"
          maxLength="150"
          name="role"
          required=""
          type="text"
          onChange={handleInputChange}
          autoComplete="role"
        />
      </Form.Group>

      <Form.Group as={Col}>
        <Form.Label>Email:</Form.Label>
        <Form.Control
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
      <Form.Group as={Col}>
        <Form.Label>Password:</Form.Label>
        <Form.Control
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
      <Stack direction="horizontal" gap={2} className="mx-auto mt-3 justify-content-center">
        <Button variant="primary" onClick={submitUser}>
          Actualizar
        </Button>
        <Button variant="danger" className="mx-3" onClick={deleteUser}>
          Eliminar Cuenta
        </Button>
      </Stack>
    </Form>
  );
};
