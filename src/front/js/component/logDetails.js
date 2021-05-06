import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "bootstrap/dist/css/bootstrap.css";
import { CountrySelectBirdy } from "./countrySelect";
import { Form, Button, FormGroup, FormControl, ControlLabe, Container } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../../styles/logDetails.scss";

toast.configure();
export const Logdetails = () => {
	const { store, actions } = useContext(Context);
	const [value, setValue] = React.useState(null);

	const [country, setCountry] = useState("");
	const [birdName, setBirdName] = useState("");
	const [localization, setLocalization] = useState("");
	const [description, setDescription] = useState("");
	const [time, setTime] = useState("");
	const [privacy, setPrivacy] = useState(false);

	const handleClick = () => {
		actions.addBirdCapture(country, birdName, localization, description, time, privacy);
		console.log(country, birdName, localization, description, time, privacy);

		inputReset();
		toast.success("Your capture has been saved!");
		// Pass login parameters to make a fetch to the back end.
	};

	const inputReset = () => {
		setCountry("");
		setBirdName("");
		setLocalization("");
		setDescription("");
		setTime("");
		setPrivacy(false);
	};

	return (
		<div className="text-center mt-5">
			<Container>
				<div>
					<div className="text-center mt-5" />
					<Form.Label className="mb-4">
						This space is for adding notes of the birds you will find across your journey.
					</Form.Label>
				</div>
				<Form>
					<Form.Group controlId="exampleForm.ControlTextarea1">
						<Form.Control
							className="sm-4 mb-3"
							as="textarea"
							rows={1}
							type="text"
							placeholder="Country"
							required
							value={country}
							onChange={e => setCountry(e.target.value)}
						/>
						<Form.Control
							className="sm-4 mb-3"
							as="textarea"
							rows={1}
							type="text"
							placeholder="Bird Name"
							required
							value={birdName}
							onChange={e => setBirdName(e.target.value)}
						/>
						<Form.Control
							className="sm-4 mb-3"
							as="textarea"
							rows={1}
							type="text"
							placeholder="Localization"
							required
							value={localization}
							onChange={e => setLocalization(e.target.value)}
						/>
						<Form.Control
							className="sm-4 mb-3"
							as="textarea"
							rows={1}
							type="text"
							placeholder="Description"
							required
							value={description}
							onChange={e => setDescription(e.target.value)}
						/>
						<Form.Control
							className="sm-4 mb-3"
							as="textarea"
							rows={1}
							type="text"
							placeholder="Time"
							required
							value={time}
							onChange={e => setTime(e.target.value)}
						/>
					</Form.Group>

					<InputGroup className="mb-3 mr-5">
						<InputGroup.Checkbox
							aria-label="Checkbox for following text input"
							onClick={e => (e.target.value === "on" ? setPrivacy(true) : setPrivacy(false))}
						/>

						<Form.Label className="ml-4 mt-2">Share with others in the community!!</Form.Label>
					</InputGroup>

					<Button
						variant="primary"
						type="submit"
						className="btn btn-block signin"
						onClick={() => handleClick()}>
						Submit
					</Button>
				</Form>
			</Container>
		</div>
	);
};

//	<CountrySelectBirdy value={value} onChange={setValue} />