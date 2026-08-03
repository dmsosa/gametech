import { useFormContext } from "react-hook-form";
import SubmitBtn from "../Control/SubmitBtn";
import BuyFormCore from "./BuyFormCore";
import BuyFormItems from "./BuyFormItems";
import SpinnerLoader from "../SpinnerLoader";
import ThankYou from "../ThankYou";
import { buyFormDefValues } from "../../../context/buyContext";



export default function BuyForm() {


	const { control, handleSubmit, reset, formState, clearErrors } = useFormContext();

	const onSubmit = async (formData) => {
		//add a delay
		await new Promise((resolve) => setTimeout(resolve, 1500))
		formData.orderId = 1
		formData.placedOn = new Date()
		console.log("submitted form data", formData);
	}
	const onSubmitError = (err) => {
		console.log("validation errors", err)
	}
	const onReset = (e) => {
		e.preventDefault();
		reset(buyFormDefValues, { keepErrors: true });
		clearErrors();
	}

	return (
		<form onSubmit={handleSubmit(onSubmit, onSubmitError)} className="container mb-5">
			{formState.isLoading && <SpinnerLoader></SpinnerLoader>}
			{formState.isSubmitted && formState.isSubmitSuccessful ?
			
			<ThankYou></ThankYou>
			:
			<>
			<BuyFormCore></BuyFormCore>
			<BuyFormItems></BuyFormItems>
			<div className="d-flex justify-content-end align-items-center gap-2">
				<SubmitBtn control={control} text={"Confirm"}></SubmitBtn>
				<button className="btn btn-danger ms-2" onClick={onReset}>Cancel</button>
			</div>
			</>
			}
		</form>
	);
}
