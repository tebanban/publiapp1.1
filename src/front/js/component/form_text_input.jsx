import React from "react";
import { Formik, useField } from "formik";
import { Form, Button, Col, Row } from "react-bootstrap";


export const Form_text_input = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <>
      <Form.Label htmlFor={props.id || props.name}>{label}</Form.Label>
      <Form.Control className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
    </>
  );
};
