import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { Home } from "./pages/home";
import { Profile } from "./pages/profile";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { AudioGallery } from "./pages/audioGallery";
import { SocialGallery } from "./pages/socialGallery";
import { ResetPassword } from "./pages/resetpassword";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div className="d-flex flex-column h-100">
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<Switch>
						<Route exact path="/">
							<Login />
						</Route>
						<Route exact path="/home">
							<Home />
						</Route>
						<Route exact path="/register">
							<Register />
						</Route>
						<Route exact path="/audioGallery">
							<AudioGallery />
						</Route>
						<Route exact path="/profile">
							<Profile />
						</Route>
						<Route exact path="/socialGallery">
							<SocialGallery />
						</Route>
						<Route exact path="/reset_password/:token">
							<ResetPassword />
						</Route>
						<Route path="*">
							<h1>Not found!</h1>
						</Route>
					</Switch>
					<Footer />
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
