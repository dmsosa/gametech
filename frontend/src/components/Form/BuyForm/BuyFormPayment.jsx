import { useFormContext, useFormState } from "react-hook-form"
import TextFieldset from "../Control/TextFieldset";

export default function BuyFormPayment() {
    const { register } = useFormContext();
    const {isSubmitted, isSubmitting, isSubmittedSuccessful } = useFormState();
    return (
        <form >
            <TextFieldset
            id={"buy-form-payment-method"}
            label="Payment Method"
            {
                ...register("payMethod",
                    {
                        required
                    }
                )
            }
            >
            </TextFieldset>
        </form>
    )
}
