import { forwardRef } from "react";

const TextFieldset = forwardRef(({
	id,
	autoFocus,
	label = undefined,
	normal = false,
	placeholder,
	clazz,
	type = "text",
	error,
	...register
	}, ref) => {
	return (
		<fieldset className="form-group mb-2">
			{label && <label htmlFor={id} className="form-label">{label}</label>}
			<input
				id={id}
				autoFocus={autoFocus}
				className={`form-control ${clazz} ${normal ? "" : "form-control-lg"}`}
				placeholder={placeholder}
				type={type}
				{...register}
				ref={ref}
			/>
			{error && <div className="fieldset-error">{error.message}</div>}
		</fieldset>
	)
});

export default TextFieldset;