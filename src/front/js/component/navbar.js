import React, { useContext } from "react";
import { Context } from "../store/appContext";

import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import birdy from "../../img/birdy.png";

import "../../styles/navbar.scss";

export const NavbarBirdy = () => {
	const { store, actions } = useContext(Context);
	const token = sessionStorage.getItem("token");

	return (
		<Navbar expand="lg" className="navbar mb-4 navbar-login">
			<Navbar.Brand>
				<Link to="/audioGallery" className="navbar-brand">
					<Image src={birdy} className="logo d-inline-block align-top" />
				</Link>
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="ml-auto">
					<Link to="/audioGallery" className="nav-link-nav pt-2 pr-5 text-decoration-none">
						Audio Gallery
					</Link>
					<Link to="/socialGallery" className="nav-link-nav pt-2 pr-5 text-decoration-none">
						Social Gallery
					</Link>
					<Link to="/profile" className="nav-link-nav pt-2 pr-5 text-decoration-none">
						Profile
					</Link>
					<Link to="/">
						<Button className="nav-link-nav" variant="primary" onClick={() => actions.logout()}>
							Log out
						</Button>
					</Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};
