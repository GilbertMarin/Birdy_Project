import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import ReactAudioPlayer from "react-audio-player";

import { Context } from "../store/appContext";
import { AudioCard } from "../component/audioCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { NavbarBirdy } from "../component/navbar";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export const FavoritesGallery = () => {
	const { store, actions } = useContext(Context);
	const [search, setSearch] = useState("");
	const history = useHistory();

	let favoriteIdArray = store.favorites.map(item => item["bird_id"]);
	let favoriteSoundsArray = store.favorites.map(item => item["url_sound"]);

	const activeUser = JSON.parse(sessionStorage.getItem("activeUser"));

	useEffect(() => {
		actions.getFavorites();
	}, []);

	const filterSound = id => {
		let sound = store.favorites.filter(item => item.bird_id === id);

		console.log(sound[0]);
		return sound[0].url_sound;
	};

	return (
		<>
			<div className="container">
				{activeUser ? (
					<div>
						<Container>
							<Row>
								{store.birdsRaw.filter(bird => favoriteIdArray.includes(bird.id)).map((bird, index) => (
									<Col xs={12} lg={6} key={index}>
										<Card className="card p-2 m-4">
											<Card.Header className="d-flex justify-content-between">
												<Card.Title>{bird.en}</Card.Title>
												<span>
													<p className="text-muted">#{bird.id}</p>
												</span>
												<Button
													variant="outline-danger"
													onClick={() => actions.deleteFavorite(bird.id)}>
													<i className="fas fa-times" />
												</Button>
											</Card.Header>
											<Card.Body>
												<Card.Text>Country: {bird.cnt}</Card.Text>
												<Card.Text>Location: {bird.loc}</Card.Text>
												<Card.Text>Hour: {bird.time} </Card.Text>
												<ReactAudioPlayer
													className="audio p-2"
													src={
														store.favorites.filter(item => item.bird_id === bird.id)[0]
															.url_sound
													}
													controls
												/>
											</Card.Body>
										</Card>
									</Col>
								))}
							</Row>
						</Container>
					</div>
				) : (
					<Image
						className="w-25 mt-5"
						src="https://media.giphy.com/media/3o7aCWH0iwyew3cLwQ/giphy.gif"
						roundedCircle
					/>
				)}
			</div>
		</>
	);
};