import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Form, Button, Col, InputGroup, Row, Modal } from "react-bootstrap";

export const FormNewOwner = () => {
  const { store, actions } = useContext(Context);
  const dataOwners = store.allOwners; /////////////////////////////Get all owners from store
  const dataFormats = store.allFormats;
  const singleOwner = store.singleOwner;
  const [files, setFiles] = useState();
  const [formValues, setFormValues] = useState();
  const [validated, setValidated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const postOwnerMessage = store.updatedOwnerMessage;

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
      submitSingleOwner();

      // Resume default
      // form.submit();
    }

    setValidated(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const submitSingleOwner = () => {
    if (formValues) {
      actions.postNewOwner(formValues);
      console.log(formValues);
      // Show a success message using a modal dialog
      setModalTitle("Éxito!");
      setModalBody(postOwnerMessage || "test");
      setShowModal(true);
    }

    if (files) {
      actions.postOwnerFile(files);
      setModalTitle("Éxito!");
      setModalBody(postOwnerMessage || "Archivo test");
      setShowModal(true);
    }
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="2" controlId="">
            <Form.Label>Código</Form.Label>
            <Form.Control required type="text" name="code" defaultValue="" placeholder="C001" onChange={handleChange} min="5" />
            <Form.Control.Feedback type="invalid">{errors.code}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="10" controlId="">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              required
              type="text"
              name="name"
              defaultValue=""
              placeholder="Nombre y apellidos"
              onChange={handleChange}
              min="5"
            />
            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6">
            <Form.Label>Compañía</Form.Label>
            <Form.Control
              type="text"
              name="company"
              defaultValue=""
              placeholder="Nombre de la sociedad"
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">{errors.company}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Label>Email</Form.Label>
              <InputGroup>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control type="text" name="email" defaultValue="" onChange={handleChange} />
              </InputGroup>
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
        <Form.Group as={Col} md="2">
            <Form.Label>Teléfono 1</Form.Label>
            <InputGroup>
              <InputGroup.Text id="inputGroupPrepend">#</InputGroup.Text>
              <Form.Control type="string" name="phone1" defaultValue="" onChange={handleChange} />
            </InputGroup>
            <Form.Control.Feedback type="invalid">{errors.phone1}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="2">
            <Form.Label>Teléfono 2</Form.Label>
            <InputGroup>
              <InputGroup.Text id="inputGroupPrepend">#</InputGroup.Text>
              <Form.Control type="string" name="phone2" defaultValue="" onChange={handleChange} />
            </InputGroup>
            <Form.Control.Feedback type="invalid">{errors.phone2}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="8">
            <Form.Label>Dirección</Form.Label>
            <Form.Control type="text" name="address" defaultValue="" onChange={handleChange} />
            <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} md="6">
            <Form.Label>Comentario</Form.Label>
            <Form.Control as="textarea" type="text" name="comment" defaultValue="" onChange={handleChange} />
          </Form.Group>

          <Form.Group as={Col} md="6">
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
        </Row>

        <Form.Group className="my-3">
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
