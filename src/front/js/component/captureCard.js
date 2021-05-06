import React, { useContext } from "react";
import { PropTypes } from "prop-types";
import { Context } from "../store/appContext";

// React-Bootstrap
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export const CaptureCard = ({ id, name, country, location, time, description, author }) => {
	const { store, actions } = useContext(Context);

	return (
		<Card>
			<Card.Header as="h5" className="d-flex justify-content-between">
				{name}
				<Button variant="outline-danger" onClick={() => actions.deleteBirdCapture(id)}>
					<i className="fas fa-times" />
				</Button>
			</Card.Header>
			<Card.Body>
				<Card.Text>Country: {country}</Card.Text>
				<Card.Text>Location: {location}</Card.Text>
				<Card.Text>Time: {time}</Card.Text>
				<Card.Text>Description: {description}</Card.Text>
				<Card.Text>Author: {author}</Card.Text>
			</Card.Body>
		</Card>
	);
};

CaptureCard.propTypes = {
	id: PropTypes.number,
	name: PropTypes.string,
	country: PropTypes.string,
	location: PropTypes.string,
	time: PropTypes.string,
	description: PropTypes.string,
	author: PropTypes.string
};