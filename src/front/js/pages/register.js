import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Context } from "../store/appContext";
import { Container, Form, Input, Button, Row, Col, FormGroup } from "react-bootstrap";
import { Login } from "./login";

import "../../styles/register.scss";

toast.configure();
export const Register = () => {
	const { store, actions } = useContext(Context);
	const [fname, setFirstName] = useState("");
	const [lname, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [bio, setBio] = useState("");

	const [pass, setPassword] = useState("");
	const history = useHistory();
	useEffect(() => {
		if (store.register) {
			console.log(store.register);
			toast.success("Profile successfully created!");
			actions.setRegister();
			history.push("/");
		}
	});

	return (
		<Container>
			<Row className="justify-content-center pt-5 mt-5 mr-1">
				<Col className="col-md-4 formulary">
					<Form action="">
						<FormGroup className="text-center pb-3">
							<h1 className="text-light">Register</h1>
						</FormGroup>
						<FormGroup className="mx-sm-4 pb-3">
							<input
								type="text"
								className="form-control"
								placeholder="First Name"
								required
								onChange={e => setFirstName(e.target.value)}
							/>
						</FormGroup>
						<FormGroup className="mx-sm-4 pb-3">
							<input
								type="text"
								className="form-control"
								placeholder="Last Name"
								required
								onChange={e => setLastName(e.target.value)}
							/>
						</FormGroup>
						<FormGroup className="mx-sm-4 pb-3">
							<input
								type="text"
								className="form-control"
								placeholder="E-mail"
								required
								onChange={e => setEmail(e.target.value)}
							/>
						</FormGroup>

						<FormGroup className="mx-sm-4 pb-3">
							<input
								type="password"
								className="form-control"
								placeholder="Password"
								required
								onChange={e => setPassword(e.target.value)}
							/>
						</FormGroup>
						<Form.Group className="mx-sm-4 pb-3">
							<Form.Control
								as="textarea"
								rows={3}
								placeholder="Write something about yourself"
								onChange={e => setBio(e.target.value)}
							/>
						</Form.Group>
						<FormGroup className="mx-sm-4 pb-3">
							<Button
								className="btn btn-block signin"
								onClick={() => {
									actions.registerValidation(fname, lname, email, pass, bio);
								}}>
								Register
							</Button>
						</FormGroup>
						<FormGroup className="mx-sm-4 pb-3 text-center">
							<Link to="/">
								<input type="submit" className="btn btn-block register" value="Back to Login" />
							</Link>
						</FormGroup>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};