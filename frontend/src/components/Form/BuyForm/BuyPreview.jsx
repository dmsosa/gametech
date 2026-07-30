import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const BuyPreview = () => {
	
	const { watch } = useFormContext();
	const items = watch("items");
	const totalItemsCount = items?.reduce((sum, item) => sum + (item.quantity), 0);
	const gTotal = items?.reduce((sum, item) => sum + (item.quantity || 0) * (item.price || 0), 0);
	
	return (
	<div className="rounded w-100 bordered d-flex align-items-center px-4 py-2 justify-content-between bg-body-secondary mb-3">
		<div>
			<FaShoppingCart className="d-inline me-3 mb-2 fs-3"></FaShoppingCart>
			<h4 className="d-inline fw-bold">{`Total items in cart: ${totalItemsCount}`}</h4>
		</div>
		<div className="d-flex align-items-center justify-content-center gap-2">
			<span className="fw-bold">{"$" + Math.round(gTotal * 100) / 100}</span>
			<Link to={"/buy"} type="button" className="btn btn-primary">Buy order</Link>
		</div>
	</div>
	);
};

export default BuyPreview;