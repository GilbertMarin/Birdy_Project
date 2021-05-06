import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Image } from "react-bootstrap";
import "../../styles/login.scss";
import chickens from "../../img/chickens.png";

export const Footer = () => {
	const { store, actions } = useContext(Context);

	return (
		<>
			{store.token ? (
				<footer className="footer mt-auto py-3 text-center white-section" id="footer">
					<div>
						<i className="fab fa-twitter social-icon" />
						<i className="fab fa-facebook-f social-icon" />
						<i className="fab fa-instagram social-icon" />
						<i className="fas fa-envelope social-icon" />
					</div>
					<p>© Copyright 2021 Birdy</p>
				</footer>
			) : (
				<footer className="footer mt-auto py-3 text-center white-section" id="footer">
					<Image className="chickens inline-block" src={chickens} alt="chickens" />
					<div>
						<i className="fab fa-twitter social-icon" />
						<i className="fab fa-facebook-f social-icon" />
						<i className="fab fa-instagram social-icon" />
						<i className="fas fa-envelope social-icon" />
					</div>
					<p>© Copyright 2021 Birdy</p>
				</footer>
			)}
			;
		</>
	);
};
