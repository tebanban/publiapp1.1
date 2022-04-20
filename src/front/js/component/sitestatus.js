import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Form } from "react-bootstrap";
import { Datepick } from "./datepick";

export const Sitestatus = () => {
	const { store, actions } = useContext(Context);
	const params = useParams();

	return (
		<div>
			<Form.Group>
				<label htmlFor="inputState">Esta valla se encuentra...</label>
				<select id="inputState" className="form-control">
					<option>Seleccione...</option>
					<option selected>Alquilada</option>
					<option>Reservada</option>
					<option>Libre</option>
					<option>En mantenimiento</option>
					<option>Deshabilitada</option>
				</select>
			</Form.Group>
			<Form.Group>
				<label htmlFor="inputAddress">Fecha inicial</label>
				<Datepick />
				<label htmlFor="inputAddress">Fecha final</label>
				<Datepick />
			</Form.Group>
		</div>
	);
};
