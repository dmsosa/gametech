import { forwardRef } from "react";
import { useFormContext } from "react-hook-form";

const CustomSelect = forwardRef(({
	label = undefined,
	id = undefined,
	clazz = "custom-select",
	normal = false,
	error,
	opts,
	...register
	}, ref) => {

		const { getValues } = useFormContext();
		const value = getValues(register.name);
	return (
		<fieldset className="form-group">
			{label && <label>{label}</label>}
			<select id={id} value={value }  className={`${clazz} form-control ${normal ? "" : "form-control-lg"}`} {...register} ref={ref}>
				<button>
					<div>
						<selectedcontent></selectedcontent>
						<svg className="picker" width="24" height="24" viewBox="0 0 24 24">
							<path fill="currentColor" d="m7 10l5 5l5-5z"/>
						</svg>
					</div>
				</button>
				{ opts.map((op) => (
					<option
					disabled={op.disabled} 
					key={op.value}
					value={op.value}
					>
						<div className="custom-option">
							<span className="icon"></span>
							<span>{op.text}</span>
							<span className="description">{op.desc}</span>
						</div>
					</option>
				)) }
			</select>
			{error && <div className="fieldset-error">{error.message}</div>}
		</fieldset>
	)
});

export default CustomSelect;