import React, { useState, useEffect, useContext } from "react";

import { Context } from "../store/appContext";
import { NavbarBirdy } from "../component/navbar";
import { useHistory } from "react-router-dom";
import { RenderGallery } from "../component/renderGallery";
import Image from "react-bootstrap/Image";

export const SocialGallery = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.getPublicBirdCaptures();
	}, []);

	// Add a condition: if (store.birdPublicCaptures.length == 0) return "There is nothing to share for the moment (or a GIF)"
	return (
		<>
			<NavbarBirdy />
			{!store.isPending ? (
				<RenderGallery birds={store.publicBirdCaptures} />
			) : (
				<Image
					className="w-25 mt-5"
					src="https://media.giphy.com/media/3o7aCWH0iwyew3cLwQ/giphy.gif"
					roundedCircle
				/>
			)}
		</>
	);
};