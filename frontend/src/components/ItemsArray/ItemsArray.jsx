import { useFieldArray, useFormContext } from "react-hook-form";
import useItemsArray from "../../hooks/useItemsArray";
import ItemCard from "./ItemCard";
import ItemsPagination from "./ItemsPagination";

function ItemsArray() {
	const { itemsArray, loading, itemsCount, itemsPerPage, setOffset } = useItemsArray({itemsPerPage: 4});

	const onPageChange = (e) => {
		const newOffset = (e.selected * itemsPerPage) % itemsCount;
		setOffset(newOffset);
	}

	const { control } = useFormContext();
	const { fields, append, remove, update } = useFieldArray({ control, name: "items" });
	const onItemAdd = (e, item) => {
		e.preventDefault();
		const existingIndex = fields?.findIndex((f) => f.itemId === item.itemId);
		if (existingIndex >= 0) {
			const existing = fields[existingIndex];
			const quantity = existing.quantity + 1;
			update(existingIndex, { ...existing, quantity, totalPrice: quantity * existing.price });
		} else {
			if (fields.length == 1 && fields[0].title == "")
				update(0, { itemId: item.itemId, title: item.title, price: item.price, quantity: 1, totalPrice: item.price });
			else
				append({ itemId: item.itemId, title: item.title, price: item.price, quantity: 1, totalPrice: item.price });
		}
	};

	const onItemRemove = (e, itemId) => {
		e.preventDefault();
		alert("item removed from the cart")
		const existingIndex = fields.findIndex((f) => f.itemId === itemId);
		if (existingIndex >= 0) remove(existingIndex);
	};

	return (
		itemsArray.length > 0 ?
		<div className="container">
			<div className="d-flex flex-wrap  justify-content-center align-items-center gap-4 mb-4">
				{itemsArray.map((item) => (
				<ItemCard key={item.itemId} item={item} onItemAdd={onItemAdd} onItemRemove={onItemRemove}></ItemCard>))}
			</div>
			<ItemsPagination totalCount={itemsCount} perPage={4} onPageChange={onPageChange}></ItemsPagination>
		</div>
		
		: loading ? 
		<div>Items loading...</div>
		:
		<div>No items available</div>
	);
	}

export default ItemsArray;
