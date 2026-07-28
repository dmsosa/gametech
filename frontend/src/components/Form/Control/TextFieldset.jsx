import { forwardRef } from "react";

const TextFieldset = forwardRef(({
	id,
	autoFocus,
	label = undefined,
	normal = false,
	placeholder,
	disabled = false,
	clazz,
	type = "text",
	error,
	...register
	}, ref) => {
	return (
		<fieldset className="mb-2">
			{label && <label htmlFor={id} className="form-label">{label}</label>}
			<input
				id={id}
				autoFocus={autoFocus}
				className={`form-control ${clazz} ${normal ? "" : "form-control-lg"} ${error && "is-invalid"}`}
				placeholder={placeholder}
				type={type}
				{...register}
				ref={ref}
				disabled={disabled}
			/>
			{error && <div className="invalid-feedback">{error.message}</div>}
		</fieldset>
	)
});

export default TextFieldset;