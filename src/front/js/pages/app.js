import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/app.scss";
import { Col, Row, Form, Table } from "react-bootstrap";
import { Sitedetail } from "../pages/sitedetail";

export const App = () => {
	const { store, actions } = useContext(Context);
	const [query, setQuery] = useState("");
	const [singleIndex, setSingleIndex] = useState();

	//Filter by status
	const data = store.site.filter(index => {
		if (query === "") {
			return index;
		} else if (index.code.toLowerCase().includes(query.toLowerCase())) {
			return index;
		} else if (index.status.toLowerCase().includes(query.toLowerCase())) {
			return index;
		}
	});

	return (
		<div>
			<div className="container">
				<Row className="mb-1">
					<Col md={4}>
						<input
							onChange={e => setQuery(e.target.value)}
							type="text"
							className="form-control"
							id="inputSearch"
							placeholder="Search"></input>
					</Col>
					<Col md={4}>
						<Form.Group>
							<select onChange={e => setQuery(e.target.value)} id="inputState" className="form-control">
								<option defaultValue>Filtrar por estado...</option>
								<option>Arrendada</option>
								<option>Inactiva</option>
								<option>Reservada</option>
								<option>Deshabilitada</option>
							</select>
						</Form.Group>
					</Col>
					<Col md={4}>
						<Form.Group>
							<select id="inputState" className="form-control">
								<option defaultValue>Filtrar por provincia...</option>
								<option>San José</option>
								<option>Alajuela</option>
								<option>Heredia</option>
								<option>Cartago</option>
								<option>Puntarenas</option>
								<option>Guanacaste</option>
								<option>Limón</option>
							</select>
						</Form.Group>
					</Col>
				</Row>
				<Table>
					<thead>
						<tr className="listheader  d-flex">
							<th className="col-1">Código</th>
							<th className="col-1">Estatus</th>
							<th className="col-2">Cliente</th>
							<th className="col-4">Ubicación</th>
							<th className="col-4">Propietario</th>
						</tr>
					</thead>
					<tbody>
						{data.map((item, index) => {
							return (
								<tr key={index} className={item.status === "Arrendada" ? "arrendada " : "disponible "}>
									<td className="col-1 codeButton">
										<Link to={"/sitedetail/" + index}>
											<span>{item.code}</span>
										</Link>
									</td>

									<td className="col-1">{item.status}</td>
									<td className="col-2">{item.client}</td>
									<td className="col-4">{item.owner}</td>
									<td className="col-4">{item.address}</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</div>
			<br />

			<Link to="/">
				<button className="btn btn-primary">Regresar</button>
			</Link>
		</div>
	);
};
