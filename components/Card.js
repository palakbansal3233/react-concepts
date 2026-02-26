import { Link } from "react-router";

const RestaurantCard = ({ id, name, cuisines, avgRating, sla, cloudinaryImageId }) => (
	<Link to={`/restaurant/${id}`} className="res-card">
		<div className="card-img-wrap">
			<img src={cloudinaryImageId} alt={name} className="card-img" />
			<span className="card-badge">{sla.slaString}</span>
		</div>
		<div className="card-content">
			<h3 className="card-title">{name}</h3>
			<p className="card-cuisine">{cuisines.join(', ')}</p>
			<div className="card-footer">
				<span className="card-rating">★ {avgRating}</span>
				<span className="card-dot">•</span>
				<span>{sla.slaString}</span>
			</div>
		</div>
	</Link>
);

export default RestaurantCard;