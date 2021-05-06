import "bootstrap/dist/css/bootstrap.css"; // or include from a CDN
import "react-bootstrap-country-select/dist/react-bootstrap-country-select.css";
import React, { useState } from "react";
import CountrySelect from "react-bootstrap-country-select";

const CountrySelectBirdy = () => {
	const [value, setValue] = useState(null);

	return <CountrySelect value={value} onChange={setValue} />;
};