import { Col, Row } from "react-bootstrap";
import TextFieldset from "../Control/TextFieldset";
import { get, useFormContext } from "react-hook-form";

export default function BuyFormCore() {

	const { getValues, register } = useFormContext();
  return (
	<>
	<Row>
		<Col>
			<TextFieldset
			id={"buy-form-username"}
				label="Your username"
				{...register("username")}
				placeholder="username"
			></TextFieldset>
		</Col>
		<Col>
		<TextFieldset
		id={"buy-form-email"}
			label="Your email"
		type="email"
		placeholder="email"
		{...register("email")}
		></TextFieldset>
		</Col>
	</Row>
	<Row>
		<Col>
			<TextFieldset
			id={"buy-form-birthdate"}
			type="date"
			{...register("birthdate")}
			placeholder="Date"
			label="Your birthday"
			></TextFieldset>
		</Col>
		<Col>
		<TextFieldset
		id={"buy-form-country"}
		label="Your country"
		{...register("country")}
		placeholder="..."
		></TextFieldset>
		</Col>
	</Row>
	</>
  );
}
