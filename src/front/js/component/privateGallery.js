import React, { useEffect, useContext } from "react";
import { RenderGallery } from "./renderGallery";
import Image from "react-bootstrap/Image";
import { Context } from "../store/appContext";

export const PrivateGallery = () => {
	const { store, actions } = useContext(Context);
	useEffect(() => {
		actions.getPrivateBirdCaptures();
	}, []);
	return (
		<>
			{!store.isPending ? (
				<RenderGallery birds={store.privateBirdCaptures} />
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