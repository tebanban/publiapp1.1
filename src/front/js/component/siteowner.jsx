import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

import { Form } from "react-bootstrap";

export const Siteowner = () => {
	const { store, actions } = useContext(Context);
	const params = useParams();

	return (
		<div>
			<Form.Group>
				<label htmlFor="inputAddress">Nombre</label>
				<input
					type="text"
					className="form-control"
					id="inputAddress"
					placeholder={store.site[params.theid].owner}></input>
			</Form.Group>
			<Form.Group>
				<label htmlFor="inputAddress">Empresa</label>
				<input
					type="text"
					className="form-control"
					id="inputAddress"
					placeholder={store.site[params.theid].owner}></input>
			</Form.Group>
			<Form.Group>
				<label htmlFor="inputAddress">Teléfono</label>
				<input
					type="text"
					className="form-control"
					id="inputAddress"
					placeholder={store.site[params.theid].phone}></input>
			</Form.Group>
			<Form.Group>
				<label htmlFor="inputAddress">Email</label>
				<input
					type="text"
					className="form-control"
					id="inputAddress"
					placeholder={store.site[params.theid].email}></input>
			</Form.Group>
		</div>
	);
};
