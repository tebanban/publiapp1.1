import React, { Component, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/SJ36-A_Garantias_Sociales.jpg";
import { Card, Col, Row, Form, CardImg, Container, Tab, Tabs } from "react-bootstrap";
import { Sitevalla } from "../component/sitevalla";
import { Siteowner } from "../component/siteowner";
import { Sitestatus } from "../component/sitestatus";

export const Sitedetail = () => {
	const { store, actions } = useContext(Context);
	const params = useParams();

	return (
		<div>
			<Card.Header as="h5">
				<div style={{ color: "red" }}>{store.site[params.theid].code}</div>
				<div>{store.site[params.theid].title} </div>
			</Card.Header>
			<Card.Body>
				<Container className="p-5 mb-4 bg-light rounded-3">
					<Row>
						<Col md={3}>
							<CardImg src={rigoImageUrl} fluid="true" />
						</Col>
						<Col md={9}>
							<Tabs defaultActiveKey="status" id="uncontrolled-tab-example" className="mb-3">
								<Tab eventKey="valla" title="Valla">
									<div>
										<Sitevalla />
									</div>
								</Tab>
								<Tab eventKey="contact" title="Contacto">
									<div>
										<Siteowner />
									</div>
								</Tab>
								<Tab eventKey="status" title="Estatus">
									<div>
										<Sitestatus />
									</div>
								</Tab>
							</Tabs>
						</Col>
					</Row>
				</Container>
			</Card.Body>
			<Link to="/app">
				<span className="btn btn-primary btn-lg" role="button">
					Back
				</span>
			</Link>
		</div>
	);
};
