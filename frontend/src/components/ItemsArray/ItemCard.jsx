import { Link } from "react-router-dom";

function ItemCard({ item, onItemAdd, onItemRemove }) {
	const { id, img, slug, title, description, price } = item;
	return (
		<div className="item-card">
			<div className="item-card-body">
				<img src={img} alt={`${title}'s image`} />
			</div>
			<div className="item-card-header">
				<Link to={`/items/${slug}`} className="link">
					<span className="d-block link">{title}</span>
					<p>{`${description.slice(0, 65)}... Read more`}</p>
				</Link>
				<hr></hr>
			</div>
			<div className="item-card-footer">
				<span>{`$ ${price}`}</span>
				<div className="d-flex justify-content-center gap-2 align-items-center">
				<button className="btn btn-primary" onClick={(e) => onItemAdd(e, item)}>
					Add to cart
				</button>
				<button className="btn btn-info" onClick={(e) => onItemRemove(e, id)}>
					Download
				</button>
				</div>
			</div>
		</div>
	);
}

export default ItemCard;