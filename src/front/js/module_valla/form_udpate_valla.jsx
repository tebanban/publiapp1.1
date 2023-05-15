import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Form, Button, Col, InputGroup, Row, Modal } from "react-bootstrap";

export const FormUpdateValla = () => {
  const { store, actions } = useContext(Context);
  const singleValla = store.singleValla;
  const [files, setFiles] = useState();
  const [formValues, setFormValues] = useState();
  const [validated, setValidated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
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

    if (!form.checkValidity()) {
      event.stopPropagation();
      event.preventDefault();
    } else {
      // Call an API or perform some other action with the form data here
      event.preventDefault();
      submitSingleValla();

      // Resume default
      form.submit();
    }

    setValidated(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const submitSingleValla = () => {
    const id = singleValla.id;
    if (formValues) {
      actions.updateValla(id, formValues);
      console.log(formValues);
      // Show a success message using a modal dialog
      setModalTitle("Éxito!");
      setModalBody(updatedVallaMessage || "Cambios aplicados");
      setShowModal(true);
    }

    if (files) {
      actions.updateVallaFile(id, files);
      setModalTitle("Éxito!");
      setModalBody(updatedVallaMessage || "Archivo actualizado");
      setShowModal(true);
    }
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="">
            <Form.Label>Nombre</Form.Label>
            <Form.Control required type="text" name="name" defaultValue={singleValla.name} onChange={handleChange} min="5" />
            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="4">
            <Form.Label>Dirección</Form.Label>
            <Form.Control type="text" name="address" defaultValue={singleValla.address} onChange={handleChange} />
            <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="4">
            <Form.Label>Provincia</Form.Label>
            <Form.Control as="select" name="province" defaultValue={singleValla.province} onChange={handleChange} required>
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
              type="number"
              name="lat"
              defaultValue={singleValla.lat}
              onChange={handleChange}
              min="-90.00000"
              max="90.00000"
              step="0.00001"
            />
            <Form.Control.Feedback type="invalid">{errors.lat}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="2">
            <Form.Label>Longitud</Form.Label>
            <Form.Control
              type="number"
              name="lng"
              defaultValue={singleValla.lng}
              onChange={handleChange}
              min="-180.00000"
              max="180.00000"
              step="0.00001"
            />
            <Form.Control.Feedback type="invalid">{errors.lng}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="4">
            <Form.Label>Ruta</Form.Label>
            <Form.Control type="text" name="route" defaultValue={singleValla.route} onChange={handleChange} />
            <Form.Control.Feedback type="invalid">{errors.route}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="4">
            <Form.Label>Sentido</Form.Label>
            <Form.Control type="text" name="way" defaultValue={singleValla.way} onChange={handleChange} />
            <Form.Control.Feedback type="invalid">{errors.way}</Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="4">
            <Form.Label>Tamaño</Form.Label>
            <Form.Control as="select" name="size" defaultValue={singleValla.size} onChange={handleChange}>
              <option value="Vertical 7.20 x 9.00 metros">Vertical 7.20 x 9.00 metros</option>
              <option value="Vertical 8.50 x 11.00 metros">Vertical 8.50 x 11.00 metros</option>
              <option value="Vertical 5.40 x 7.20 metros">Vertical 5.40 x 7.20 metros</option>
              <option value="Horizontal 12.60 x 5.00 metros">Horizontal 12.60 x 5.00 metros</option>
              <option value="Horizontal 14.40 x 5.00 metros">Horizontal 14.40 x 5.00 metros</option>
              <option value="Horizontal 14.40 x 6.00 metros">Horizontal 14.40 x 6.00 metros</option>
              <option value="Horizontal 7.20 x 5.40 metros">Horizontal 7.20 x 5.40 metros</option>
              <option value="Landmark 33.30 x 8.50 metros">Landmark 33.30 x 8.50 metros</option>
              <option value="Landmark 71.10 x 4.90 metros">Landmark 71.10 x 4.90 metros</option>
              <option value="Landmark 34.80 x 8.90 metros">Landmark 34.80 x 8.90 metros</option>
            </Form.Control>

            <Form.Control.Feedback type="invalid">{errors.size}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="4">
            <Form.Label>Tipo</Form.Label>
            <Form.Control as="select" name="typology" defaultValue={singleValla.typology} onChange={handleChange}>
              <option value="Unipolar">Unipolar</option>
              <option value="Landmark">Landmark</option>
              <option value="Columnas alma llena">Columnas alma llena</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">{errors.typology}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="4">
            <Form.Label>Iluminación</Form.Label>
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
              <Form.Control
                type="number"
                name="price_low"
                defaultValue={singleValla.price_low}
                onChange={handleChange}
                max="20000.00"
                step="0.01"
              />
              <Form.Control.Feedback type="invalid">{errors.price_low}</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group as={Col} md="2">
            <Form.Label>Precio mayor</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
              <Form.Control
                type="number"
                name="price_high"
                defaultValue={singleValla.price_high}
                onChange={handleChange}
                max="20000.00"
                step="0.01"
              />
              <Form.Control.Feedback type="invalid">{errors.price_high}</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group as={Col} md="2">
            <Form.Label>Lona</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
              <Form.Control
                type="number"
                name="price_canvas"
                defaultValue={singleValla.price_canvas}
                onChange={handleChange}
                max="20000.00"
                step="0.01"
              />
              <Form.Control.Feedback type="invalid">{errors.price_canvas}</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group as={Col} md="2">
            <Form.Label>Tráfico</Form.Label>
            <Form.Control type="number" name="traffic" defaultValue={singleValla.traffic} onChange={handleChange} step="1" />
            <Form.Control.Feedback type="invalid">{errors.traffic}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="4">
            <Form.Label>Comentario</Form.Label>
            <Form.Control as="textarea" type="text" name="comment" defaultValue={singleValla.comment} onChange={handleChange} />
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
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalBody}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
