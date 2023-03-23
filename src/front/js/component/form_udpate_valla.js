import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Form, Button, Col, Select, Row } from "react-bootstrap";
import { Formik } from "formik";
import { object, string, number, bool, date, InferType } from "yup";

const schema = object().shape({
  name: string().required().min(5),
  address: string().required(),
  province: string().required(),
  route: string().required(),
  view: string().required(),
  terms: bool().required().oneOf([true], "Terms must be accepted"),
});

export const FormUpdateValla = () => {
  const { store, actions } = useContext(Context);
  const singleValla = store.singleValla;

  return (
    <Formik
      validationSchema={schema}
      onSubmit={console.log}
      initialValues={{
        name: singleValla.name,
        province: singleValla.province,
        address: singleValla.address,
        typology: singleValla.typology,
        layout: singleValla.layout,
        size: singleValla.size,
        light: singleValla.light,
        price_low: singleValla.price_low,
        price_high: singleValla.price_high,
        route: singleValla.route,
        view: singleValla.view,
        lat: singleValla.lat,
        lng: singleValla.lng,
        comment: singleValla.comment,
        terms: false,
      }}
    >
      {({ handleSubmit, handleChange, handleBlur, values, touched, isValid, errors }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                isValid={touched.name && !errors.name}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="6">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={values.address}
                onChange={handleChange}
                isValid={touched.address && !errors.address}
                isInvalid={!!errors.address}
              />
              <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="4">
              <Form.Label>Provincia</Form.Label>
              <Form.Control
                as="select"
                name="province"
                value={values.province}
                onChange={handleChange}
                isValid={touched.province && !errors.province}
                isInvalid={!!errors.province}
              >
                <option value="Alajuela">Alajuela</option>
                <option value="Cartago">Cartago</option>
                <option value="Guanacaste">Guanacaste</option>
                <option value="Heredia">Heredia</option>
                <option value="Limón">Limón</option>
                <option value="Puntarenas">Puntarenas</option>
                <option value="San José">San José</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">{errors.province}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4">
              <Form.Label>Ruta</Form.Label>
              <Form.Control
                type="text"
                name="route"
                value={values.route}
                onChange={handleChange}
                isValid={touched.route && !errors.route}
                isInvalid={!!errors.route}
              />
              <Form.Control.Feedback type="invalid">{errors.route}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4">
              <Form.Label>Vista</Form.Label>
              <Form.Control
                type="text"
                name="view"
                value={values.view}
                onChange={handleChange}
                isValid={touched.view && !errors.view}
                isInvalid={!!errors.view}
              />
              <Form.Control.Feedback type="invalid">{errors.view}</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Form.Group className="mb-3">
            <Form.Check
              required
              name="terms"
              label="Agree to terms and conditions"
              onChange={handleChange}
              isInvalid={!!errors.terms}
              feedback={errors.terms}
              feedbackType="invalid"
              id="validationFormik0"
            />
          </Form.Group>
          <Button type="submit">Submit form</Button>
        </Form>
      )}
    </Formik>
  );
};
