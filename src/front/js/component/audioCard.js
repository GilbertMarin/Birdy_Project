import React, { useState, useEffect, useContext } from "react";
import ReactAudioPlayer from "react-audio-player";
import { PropTypes } from "prop-types";
import "../../styles/audioCard.scss";
import { Context } from "../store/appContext";

// React-Bootstrap
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

export const AudioCard = ({ id, name, country, location, time, sound }) => {
	const { store, actions } = useContext(Context);
	//const [favorite, setFavorite] = useState(false);

	let favoriteNameArray = store.favorites.map(item => item["bird_id"]);
	let isFavorite = favoriteNameArray.includes(id);
	//setFavorite(isFavorite);

	//let favoriteFlag = true;
	const handleClickFavorite = () => {
		if (isFavorite) {
			// let favoriteIds = store.favorites.filter(item => {
			// 	if (item["url_sound"] === sound) return item["id"];
			// });

			// passed an id and not a sound.
			actions.deleteFavorite(id);
			console.log("Called deleteFavorite on ID: ", id);
			isFavorite = false;
			console.log("favoriteIcon is: ", isFavorite);
		} else {
			actions.addFavorite(sound, id);
			isFavorite = true;
			console.log("favoriteIcon is: ", isFavorite);
		}
	};

	return (
		<Card className="card p-2 mb-2">
			<Card.Header className="d-flex justify-content-between">
				<Card.Title className="card-title">{name}</Card.Title>
				<span>
					<p className="id-card">#{id}</p>
				</span>
				<OverlayTrigger placement="top" overlay={<Tooltip id="button-tooltip-2">Add to favorites</Tooltip>}>
					<Button variant="outline-warning" onClick={() => handleClickFavorite()}>
						<i className={isFavorite ? "fas fa-heart" : "far fa-heart"} />
					</Button>
				</OverlayTrigger>
			</Card.Header>
			<Card.Body>
				<Card.Text>Country: {country}</Card.Text>
				<Card.Text>Location: {location}</Card.Text>
				<Card.Text>Time: {time} </Card.Text>
				<ReactAudioPlayer className="audio p-2" src={sound} controls />
			</Card.Body>
		</Card>
	);
};

AudioCard.propTypes = {
	id: PropTypes.string,
	name: PropTypes.string,
	country: PropTypes.string,
	location: PropTypes.string,
	time: PropTypes.string,
	sound: PropTypes.string
};