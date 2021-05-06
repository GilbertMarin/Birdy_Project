import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { NavbarBirdy } from "../component/navbar";
import logoPrincipal from "../../img/logoPrincipal.png";

import "../../styles/home.scss";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<>
			<NavbarBirdy />
			<div className="header">
				<div className="container pt-5">
					<section className="row">
						<div className="textBird">
							<h1>Bird Watchers Club</h1>
							<h2 className="textDiscover">Discover the songs of the most exotic birds</h2>
						</div>
						<div className="logoPrincipal">
							<img className="logo" src={logoPrincipal} />
						</div>
					</section>
				</div>
			</div>
		</>
	);
};
