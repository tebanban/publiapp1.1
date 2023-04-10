import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Form, Button, Col, InputGroup, Row } from "react-bootstrap";

export const FormUpdateValla = () => {
  const { store, actions } = useContext(Context);
  const singleValla = store.singleValla;
  const [files, setFiles] = useState();
  const [formValues, setFormValues] = useState();
  const [validated, setValidated] = useState(false);
  const updatedVallaMessage = store.updatedVallaMessage;

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    console.log(formValues);
  };

  const errors = {
    name: "Error en el nombre",
    address: "Error en dirección",
    terms: "Debe aceptar los términos",
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    
    submitSingleValla();
    setTimeout(() => {
      updatedVallaMessage ? alert(updatedVallaMessage) : alert("error");
    }, 4000);
  };

  const submitSingleValla = () => {
    const id = singleValla.id;
    if (formValues) {
      actions.updateValla(id, formValues);
      console.log(formValues);
    }

    if (files) {
      actions.updateVallaFile(id, files);
    }
    // // window.location.reload()
    //   actions.getSingleValla(id);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="">
          <Form.Label>Nombre</Form.Label>
          <Form.Control required type="text" name="name" defaultValue={singleValla.name} onChange={handleChange} min="5" />
          <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="4">
          <Form.Label>Dirección</Form.Label>
          <Form.Control required type="text" name="address" defaultValue={singleValla.address} onChange={handleChange} />
          <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="4">
          <Form.Label>Provincia</Form.Label>
          <Form.Control as="select" name="province" defaultValue={singleValla.province} onChange={handleChange}>
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
          <Form.Control type="text" name="lat" defaultValue={singleValla.lat} onChange={handleChange} />
          <Form.Control.Feedback type="invalid">{errors.lat}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="2">
          <Form.Label>Longitud</Form.Label>
          <Form.Control type="text" name="lng" defaultValue={singleValla.lng} onChange={handleChange} />
          <Form.Control.Feedback type="invalid">{errors.lng}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="4">
          <Form.Label>Ruta</Form.Label>
          <Form.Control type="text" name="route" defaultValue={singleValla.route} onChange={handleChange} />
          <Form.Control.Feedback type="invalid">{errors.route}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="4">
          <Form.Label>Vista</Form.Label>
          <Form.Control type="text" name="view" defaultValue={singleValla.view} onChange={handleChange} />
          <Form.Control.Feedback type="invalid">{errors.view}</Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="4">
          <Form.Label>Tamaño</Form.Label>
          <Form.Control as="select" name="size" defaultValue={singleValla.size} onChange={handleChange}>
            <option value="7.20 x 9.00 metros">7.20 x 9.00 metros</option>
            <option value="8.50 x 11.00 metros">8.50 x 11.00 metros</option>
            <option value="12.70 x 5.00 metros">12.70 x 5.00 metros</option>
          </Form.Control>

          <Form.Control.Feedback type="invalid">{errors.size}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="4">
          <Form.Label>Tipo</Form.Label>
          <Form.Control as="select" name="typology" defaultValue={singleValla.typology} onChange={handleChange}>
            <option value="Unipolar">Unipolar</option>
            <option value="Landmark">Landmark</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid">{errors.typology}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="2">
          <Form.Label>Horz/Vert</Form.Label>
          <Form.Control as="select" name="layout" defaultValue={singleValla.layout} onChange={handleChange}>
            <option value="Horizontal">Horizontal</option>
            <option value="Vertical">Vertical</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid">{errors.layout}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="2">
          <Form.Label>light</Form.Label>
          <Form.Control as="select" name="light" defaultValue={singleValla.light} onChange={handleChange}>
            <option value="yes">Sí</option>
            <option value="no">No</option>
          </Form.Control>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="2">
          <Form.Label>Precio menor</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
            <Form.Control type="text" name="price_low" defaultValue={singleValla.price_low} onChange={handleChange} />
            <Form.Control.Feedback type="invalid">{errors.price_low}</Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group as={Col} md="2">
          <Form.Label>Precio mayor</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
            <Form.Control type="text" name="price_high" defaultValue={singleValla.price_high} onChange={handleChange} />
            <Form.Control.Feedback type="invalid">{errors.price_high}</Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group as={Col} md="8">
          <Form.Label>Comentario</Form.Label>
          <Form.Control type="text" name="comment" defaultValue={singleValla.comment} onChange={handleChange} />
        </Form.Group>
      </Row>
      <Form.Group className="form-group my-2">
        <label htmlFor="file" className=" control-label">
          Fotografía
        </label>
        <div className="">
          <input
            className="form-control"
            id="file"
            name="file"
            type="file"
            onChange={(e) => {
              setFiles(e.target.files);
            }}
          />
        </div>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Check required name="terms" label="Acepto los cambios" feedback={errors.terms} feedbackType="invalid" />
      </Form.Group>
      <Button type="submit">Submit form</Button>
    </Form>
  );
};
