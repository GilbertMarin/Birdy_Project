import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

import { FormGroup, Form, FormLabel, FormControl, Tabs, Tab, Image } from "react-bootstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faCheckSquare, faCoffee } from "@fortawesome/free-solid-svg-icons";

import { Logdetails } from "../component/logDetails";
import { NavbarBirdy } from "../component/navbar";
import { PrivateGallery } from "../component/privateGallery";

import "../../styles/profile.scss";
import { FavoritesGallery } from "../component/favoritesGallery";
import profile from "../../img/profile.jpg";
import lapaVectorWhite from "../../img/lapaVectorWhite.png";

library.add(fab, faCheckSquare, faCoffee);

export const Profile = () => {
	const { store, actions } = useContext(Context);
	const activeUser = JSON.parse(sessionStorage.getItem("activeUser"));
	console.log("Active user on sessionStorage from profile: ", activeUser);

	return (
		<>
			<NavbarBirdy />
			<div className="fondo">
				<div className="container bootstrap snippets bootdey">
					{activeUser && activeUser != "" && activeUser !== undefined && activeUser !== null ? (
						<div className="row">
							<div className="profile-nav col-md-3 mt-5">
								<div className="panel">
									<div className="user-heading">
										<Image className="profile-img " src={profile} roundedCircle />

										<div className="texto1 mt-5 ml-4">
											<p>{activeUser.first_name}</p>
											<p>{activeUser.email}</p>
											<div className="social">
												<a
													className="fab fa-facebook fa-2x mr-4 text-decoration-none"
													href="http://www.facebook.com/"
												/>
												<a
													className="fab fa-instagram fa-2x mr-4 text-decoration-none"
													href="http://www.instagram.com/"
												/>
												<a
													className="fab fa-twitter fa-2x text-decoration-none"
													href="http://www.twitter.com/"
												/>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="profile-info col-md-9 mt-5">
								<Tabs defaultActiveKey="Personal Information" id="uncontrolled-tab-example">
									<Tab
										eventKey="Personal Information"
										title="Personal Information"
										className="texto2 mt-5">
										<p>First Name: {activeUser.first_name}</p>
										<p>Last Name: {activeUser.last_name}</p>
										<p>Email: {activeUser.email}</p>
										<p>Bio: {activeUser.bio}</p>
										<Image className="profile-bird" src={lapaVectorWhite} />
									</Tab>
									<Tab eventKey="Favorites" title="Favorites">
										<FavoritesGallery />
									</Tab>
									<Tab eventKey="Private Gallery" title="Private Gallery">
										<PrivateGallery />
									</Tab>
									<Tab eventKey="Capture" title="Capture">
										<Logdetails />
									</Tab>
								</Tabs>
							</div>
						</div>
					) : (
						<Image
							className="w-25 mt-5"
							src="https://media.giphy.com/media/3o7aCWH0iwyew3cLwQ/giphy.gif"
							roundedCircle
						/>
					)}
				</div>
			</div>
		</>
	);
};