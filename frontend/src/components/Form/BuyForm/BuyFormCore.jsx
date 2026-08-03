import { Col, Row } from "react-bootstrap";
import TextFieldset from "../Control/TextFieldset";
import { get, useFormContext } from "react-hook-form";

export default function BuyFormCore() {

	const { formState, register } = useFormContext();
	const { errors } = formState;
  return (
	<>
	<input type="hidden" {...register("orderId")} />
	<input type="hidden" {...register("placedOn")} />
	<Row className="mb-2">
		<Col>
			<TextFieldset
				id={"buy-form-order-no"}
				label="Your #Order No."
				disabled
				{...register("orderNo")}
			></TextFieldset>
		</Col>
		<Col>
		<TextFieldset
			id={"buy-form-mobile"}
			label="Mobile number"
			type="text"
			placeholder="+00 000 000 000"
			{...register("mobile", 
				{
					required: "this field is required.",
				})}
			error={errors.mobile}
		></TextFieldset>
		</Col>
	</Row>
	<Row className="mb-2">
		<Col>
			<TextFieldset
				id={"buy-form-username"}
				label="Your username"
				{...register("username", 
					{
						required: "This field is required.",
						minLength: {
							value: 5,
							message: "Username must be at least 5 characters",
						},
						maxLength: {
							value: 25,
							message: "Username cannot exceed 25 characters",
						},
					})
				}
				placeholder="username"
				error={errors.username}
			></TextFieldset>
		</Col>
		<Col>
		<TextFieldset
			id={"buy-form-email"}
			label="Email"
			type="email"
			placeholder="clarence@acme.com"
			{...register("email", {
				pattern: {
					value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
					message: "Incorrect email format.",
				},
			})}
			error={errors.email}
		></TextFieldset>
		</Col>
	</Row>
	<Row className="mb-2">
		<Col>
			<TextFieldset
				id={"buy-form-birthdate"}
				type="date"
				{...register("birthdate", {
					required: "This field is required.",
				})}
				placeholder="Date"
				label="Your birthdate"
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
