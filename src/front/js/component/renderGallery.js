import React, { useState, useContext } from "react";
import { PropTypes } from "prop-types";
import { Context } from "../store/appContext";
import { CaptureCard } from "./captureCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Alert from "react-bootstrap/Alert";

export const RenderGallery = ({ birds }) => {
	const { store, actions } = useContext(Context);
	const [search, setSearch] = useState("");

	return (
		<div className="container">
			{birds.length > 0 ? (
				<div>
					<InputGroup className="py-4">
						<FormControl
							placeholder="Search..."
							value={search}
							onChange={e => {
								setSearch(e.target.value);
							}}
						/>
					</InputGroup>
					<Container>
						<Row>
							{birds
								.filter(bird => {
									if (search == "") {
										return bird;
									} else if (bird.en.toLowerCase().includes(search.toLowerCase())) {
										return bird;
									}
								})
								.map((bird, index) => (
									<Col xs={12} md={6} lg={4} key={index}>
										<CaptureCard
											id={bird.id}
											name={bird.en}
											country={bird.cnt}
											location={bird.loc}
											time={bird.time}
											description={bird.rmk}
											author={bird.author}
										/>
									</Col>
								))}
						</Row>
					</Container>
				</div>
			) : (
				<>
					<Alert className="mt-4" variant="info">
						There&apos;s nothing to share yet . . Add some captures first!!
					</Alert>
				</>
			)}
		</div>
	);
};

RenderGallery.propTypes = {
	birds: PropTypes.array
};