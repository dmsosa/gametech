import { FormProvider, useForm } from "react-hook-form";
import { ftGetItem, ftSetItem } from "../helpers/localStorageHelper";
import { useEffect } from "react";

const BUY_FORM_KEY = "buy-form-values";

export const buyFormDefValues = {
	orderId: 0,
	orderNo: new Date().valueOf(),
	placedOn: new Date(),
	username: "patata",
	email: "",
	country: "Spain",
	mobile: "",
	password: "",
	passwordConfirm: "",
	age: undefined,
	birthdate: new Date().toISOString().split('T')[0],
	paymentMethod: "",
	deliveryIn: 0,
	items: [{ itemId: 0, title: "", price: 0, quantity: 0, totalPrice: 0 }],
	address: {
		streetAddress: "",
		landmark: "",
		city: "",
		state: "",
	},
	gdpr: false,
	disability: false,
}

export function BuyFormProvider({ children }) {

	const methods = useForm({
		defaultValues: async () => {
			try {
				const values = ftGetItem(BUY_FORM_KEY);
				if (values == null)
					return (buyFormDefValues);
				else 
					return (values);
			}
			catch (e) {
				console.log("Error while loading from local storage", e);
				return (buyFormDefValues);
			}
		},
		mode: "onChange",
	});

	const {
		watch,
	} = methods;

	useEffect(() => {
	const subscription = watch((values) => {
    	ftSetItem(BUY_FORM_KEY, values);
    });
    return () => subscription.unsubscribe();
	}, []);


	return (
		<FormProvider {...methods}>
			{children}
		</FormProvider>
	)
}
