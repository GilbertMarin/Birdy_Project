import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
	Alert,
	Container,
	Button,
	InputGroup,
	FormControl,
	Row,
	Form,
	FormGroup,
	Col,
	Carousel,
	Image,
	Navbar
} from "react-bootstrap";
import { Register } from "./register";
import "../../styles/login.scss";
import swal from "sweetalert";

// Images importation
import logo4 from "../../img/logo4.png";
import birdVector1 from "../../img/birdVector1.png";
import woodPecker from "../../img/woodPecker.png";
import woodPecker2 from "../../img/woodPecker2.png";
import birdsGroup from "../../img/birdsGroup.png";

import pc1 from "../../img/pc1.png";
import pc2 from "../../img/pc2.png";
import pc3 from "../../img/pc3.png";
import pc4 from "../../img/pc4.png";

toast.configure();
export const Login = () => {
	const { store, actions } = useContext(Context);
	const [resp, setResp] = useState(true);
	const [user, setUser] = useState("");
	const [pass, setPass] = useState("");
	const history = useHistory();

	const ForgotPassord = () => {
		swal("We going to help you with your password restore", {
			content: {
				element: "input",

				attributes: {
					placeholder: "Type your Email",
					type: "text"
				}
			}
		})
			.then(value => {
				if (value.includes("@") && value.includes(".")) {
					swal("Nice!", "Please check your email inbox!", "success");
					const opts = {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							email: value
						})
					};

					fetch(`${store.newURL}/restore`, opts)
						.then(res => {
							if (!res.ok) {
								// the "the throw Error will send the error to the "catch"
								throw Error("Could not fetch the data for that resource");
							}
							return res.json();
						})

						.catch(err => {
							console.error(err.message);
						});
				} else {
					swal("oopps!!", "Wrong Email, please verify!", "error");
				}
			})
			.then(() => {});
	};

	const handleClick = () => {
		if (user == "" || pass == "" || user == undefined || pass == undefined) toast.error("Bad email or password");
		else {
			actions.loginValidation(user, pass);
		}
		// Pass login parameters to make a fetch to the back end.
	};

	// Every time it finds a token into the storage it will redirect to /home page
	if (store.token && store.token != "" && store.token != undefined && store.token != null)
		history.push("/audioGallery");

	return (
		<>
			<section className="colored-section" id="title">
				<Container fluid className="container-fluid">
					<nav className="navbar navbar-expand-lg navbar-dark">
						<a href="/" className="navbar-brand">
							<img src={logo4} className="logo d-inline-block align-top" />
						</a>
						<button
							className="navbar-toggler"
							type="button"
							data-toggle="collapse"
							data-target="#navbarSupportedContent"
							aria-controls="navbarSupportedContent"
							aria-expanded="false"
							aria-label="Toggle navigation">
							<span className="navbar-toggler-icon" />
						</button>
						<div className="collapse navbar-collapse" id="navbarSupportedContent">
							<ul className="navbar-nav ml-auto">
								<li className="nav-item">
									<a className="nav-link nav-link-login" href="#footer">
										Contact
									</a>
								</li>
								<li className="nav-item">
									<a className="nav-link nav-link-login" href="#testimonial">
										Testimonial
									</a>
								</li>
								<li className="nav-item">
									<a className="nav-link nav-link-login" href="#login">
										Login
									</a>
								</li>
							</ul>
						</div>
					</nav>

					<div className="row">
						<div className="col-lg-6">
							<h1 className="big-heading">Keep track of the birds you&apos;ve seen!!</h1>
							<button type="button" className="btn btn-dark btn-lg download-button">
								<i className="fab fa-apple" /> Download
							</button>
							<button type="button" className="btn btn-outline-light btn-lg download-button">
								<i className="fab fa-google-play" /> Download
							</button>
						</div>
						<div className="col-lg-6">
							<Image className="title-image" src={birdVector1} />
						</div>
					</div>
				</Container>
			</section>

			<section id="testimonial">
				<Image className="birdsGroup" src={birdsGroup} alt="birdsGroup" />
				<Carousel>
					<Carousel.Item className="carousel-item">
						<div className="comment-card rounded">
							<h2 className="testimonial-text">
								&quot;I suscribed to Birdy and now I can save the songs of my favorite birds.&quot;
							</h2>
							<div className="d-flex justify-content-center">
								<Image className="testimonials-image" src={pc3} alt="woman-red" />
								<em className="ml-3 mt-5">Katherine Rojas / Journalist</em>
							</div>
						</div>
					</Carousel.Item>

					<Carousel.Item className="carousel-item">
						<div className="comment-card rounded">
							<h2 className="testimonial-text">
								&quot;I&apos;am studying biology and with Birdy I learn the scientific names, locations
								and songs of birds.&quot;
							</h2>
							<div className="d-flex justify-content-center">
								<Image className="testimonials-image" src={pc2} alt="studen-smiling" />
								<em className="ml-3 mt-5">Sebastian Suarez / Student</em>
							</div>
						</div>
					</Carousel.Item>

					<Carousel.Item className="carousel-item">
						<div className="comment-card rounded">
							<h2 className="testimonial-text">
								&quot;With Birdy, I can share my explorations with the birdwatchers community through
								this social app.&quot;
							</h2>
							<div className="d-flex justify-content-center">
								<Image className="testimonials-image" src={pc4} alt="blond-man" />
								<em className="ml-3 mt-5">Hans Krugger / Chef</em>
							</div>
						</div>
					</Carousel.Item>

					<Carousel.Item className="carousel-item">
						<div className="comment-card rounded">
							<h2 className="testimonial-text">
								&quot;I like Birdy because is useful and easy to use.&quot;
							</h2>
							<div className="d-flex justify-content-center">
								<Image className="testimonials-image" src={pc1} alt="blond-man" />
								<em className="ml-3 mt-5">Karen Corrales / Singer Teacher</em>
							</div>
						</div>
					</Carousel.Item>
				</Carousel>
			</section>
			<section id="login">
				<Container>
					<Row className="justify-content-center pt-5 mt-5 mr-1">
						<Image className="woodPecker2" src={woodPecker2} alt="woodPecker" />
						<Col className="col-md-4 formulary">
							<Form action="">
								<FormGroup className="text-center pb-3">
									<h1 className="text-light">Login</h1>
								</FormGroup>
								<FormGroup className="mx-sm-4 pb-3">
									<input
										type="text"
										className="form-control"
										placeholder="Email"
										onChange={e => setUser(e.target.value)}
									/>
								</FormGroup>
								<FormGroup className="mx-sm-4 pb-3">
									<input
										type="password"
										className="form-control"
										placeholder="Password"
										onChange={e => setPass(e.target.value)}
									/>
								</FormGroup>
								<FormGroup className="mx-sm-4 pb-3">
									<Button className="btn btn-block signin" onClick={() => handleClick()}>
										Login
									</Button>
								</FormGroup>
								<FormGroup className="mx-sm-4 pb-3 text-center">
									<Link to="/register">
										<input type="submit" className="btn btn-block register" value="Register" />
									</Link>
								</FormGroup>
								<FormGroup className="mx-sm-4 pb-3 text-center">
									<Link to="">
										<input
											type="submit"
											className="btn btn-block forgot"
											value="Forgot your Password"
											onClick={() => ForgotPassord()}
										/>
									</Link>
								</FormGroup>
							</Form>
						</Col>
						<Image className="woodPecker" src={woodPecker} alt="woodPecker" />
					</Row>
				</Container>
			</section>
		</>
	);
};