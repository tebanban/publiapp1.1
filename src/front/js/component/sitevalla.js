import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Form } from "react-bootstrap";

export const Sitevalla = () => {
	const { store, actions } = useContext(Context);
	const params = useParams();

	return (
		<div>
			<Form.Group>
				<label htmlFor="inputState">Dimensiones</label>
				<select id="inputState" className="form-control">
					<option selected>Seleccione...</option>
					<option>8.50 x 11.0 metros</option>
					<option>7.20 x 9.00 metros</option>
					<option>5.00 x 12.60 metros</option>
					<option>4.50 x 14.00 metros</option>
					<option>8.50 x 33.30 metros</option>
					<option>5.20 x 7.00 metros</option>
				</select>
			</Form.Group>
			<Form.Group>
				<label htmlFor="inputAddress">Dirección</label>
				<input
					type="text"
					className="form-control"
					id="inputAddress"
					placeholder={store.site[params.theid].address}></input>
			</Form.Group>
			<Form.Group>
				<label htmlFor="inputAddress">Ruta</label>
				<input
					type="text"
					className="form-control"
					id="inputAddress"
					placeholder={store.site[params.theid].address}></input>
			</Form.Group>
			<Form.Group>
				<label htmlFor="inputState">Provincia</label>
				<select id="inputState" className="form-control">
					<option selected>Seleccione la provincia...</option>
					<option>San José</option>
					<option>Alajuela</option>
					<option>Heredia</option>
					<option>Cartago</option>
					<option>Puntarenas</option>
					<option>Guanacaste</option>
					<option>Limón</option>
				</select>
			</Form.Group>
		</div>
	);
};
