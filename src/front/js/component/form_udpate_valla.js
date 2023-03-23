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
            <Form.Group as={Col} md="4" controlId="">
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

            <Form.Group as={Col} md="4">
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
                <option value="">Seleccione provincia: </option>
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
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="2">
              <Form.Label>Latitud</Form.Label>
              <Form.Control
                type="text"
                name="lat"
                value={values.lat}
                onChange={handleChange}
                isValid={touched.lat && !errors.lat}
                isInvalid={!!errors.lat}
              />
              <Form.Control.Feedback type="invalid">{errors.lat}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="2">
              <Form.Label>Longitud</Form.Label>
              <Form.Control
                type="text"
                name="lng"
                value={values.lng}
                onChange={handleChange}
                isValid={touched.lng && !errors.lng}
                isInvalid={!!errors.lng}
              />
              <Form.Control.Feedback type="invalid">{errors.lng}</Form.Control.Feedback>
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

          <Row className="mb-3">
            <Form.Group as={Col} md="4">
              <Form.Label>Tamaño</Form.Label>
              <Form.Control as="select" name="size" value={values.size} onChange={handleChange}>
                <option value="">Seleccione tamaño: </option>
                <option value="7.20 x 9.00 metros">7.20 x 9.00 metros</option>
                <option value="8.50 x 11.00 metros">8.50 x 11.00 metros</option>
                <option value="12.70 x 5.00 metros">12.70 x 5.00 metros</option>
              </Form.Control>

              <Form.Control.Feedback type="invalid">{errors.size}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4">
              <Form.Label>Tipo</Form.Label>
              <Form.Control as="select" name="typology" value={values.typology} onChange={handleChange}>
                <option value="">Seleccione tipo: </option>
                <option value="Unipolar">Unipolar</option>
                <option value="Landmark">Landmark</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">{errors.typology}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="2">
              <Form.Label>Horz/Vert</Form.Label>
              <Form.Control as="select" name="layout" value={values.layout} onChange={handleChange}>
                <option value="">Seleccione: </option>
                <option value="Horizontal">Horizontal</option>
                <option value="Vertical">Vertical</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">{errors.layout}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="2">
              <Form.Label>light</Form.Label>
              <Form.Control
                type="text"
                name="route"
                value={values.light}
                onChange={handleChange}
                isValid={touched.light && !errors.light}
                isInvalid={!!errors.light}
              />
              <Form.Control.Feedback type="invalid">{errors.light}</Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="2">
              <Form.Label>Precio menor</Form.Label>
              <Form.Control
                type="text"
                name="price_low"
                value={values.price_low}
                onChange={handleChange}
                isValid={touched.lat && !errors.price_low}
                isInvalid={!!errors.price_low}
              />
              <Form.Control.Feedback type="invalid">{errors.price_low}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="2">
              <Form.Label>Precio mayor</Form.Label>
              <Form.Control
                type="text"
                name="price_high"
                value={values.price_high}
                onChange={handleChange}
                isValid={touched.price_high && !errors.price_high}
                isInvalid={!!errors.price_high}
              />
              <Form.Control.Feedback type="invalid">{errors.price_high}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="8">
              <Form.Label>Comentario</Form.Label>
              <Form.Control type="text" name="route" value={values.comment} onChange={handleChange} />
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
