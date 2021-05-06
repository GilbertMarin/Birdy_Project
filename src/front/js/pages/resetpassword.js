import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
	Container,
	Button,
	InputGroup,
	FormControl,
	Row,
	Form,
	FormGroup,
	Col,
	Carousel,
	Image
} from "react-bootstrap";

toast.configure();
export const ResetPassword = () => {
	const { store, actions } = useContext(Context);
	const [pass, setPass] = useState("");
	let { token } = useParams();
	const history = useHistory();

	console.log("estoy en resetpassword func", token);
	useEffect(() => {
		fetch(`${store.newURL}/confirm_email/${token}`)
			.then(resp => {
				return resp.json();
			})
			.then(resp => {
				console.log(resp);
			});
	}, []);

	const handleClick = () => {
		actions.reset_Password(pass, token);
		history.push("/");
		toast.success("Password successfully changed!");
	};

	return (
		<Container>
			<Row className="justify-content-center pt-5 mt-5 mr-1">
				<Col className="col-md-4 formulary">
					<Form action="">
						<FormGroup className="text-center pb-3">
							<h1 className="text-light">Restore Password</h1>
						</FormGroup>

						<FormGroup className="mx-sm-4 pb-3">
							<input
								type="password"
								className="form-control"
								placeholder="New Password"
								onChange={e => setPass(e.target.value)}
								required
							/>
						</FormGroup>
						<FormGroup className="mx-sm-4 pb-3">
							<Button className="btn btn-block signin" onClick={() => handleClick()}>
								Restore
							</Button>
						</FormGroup>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};