import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import { BASE_URL, IMAGE_CDN } from "../utils/constants";
import Shimmer from "./Shimmer";

const formatPrice = (paise) => {
	if (paise == null) return "—";
	return `₹${(paise / 100).toFixed(0)}`;
};

const getImageUrl = (imageId) => {
	if (!imageId) return null;
	if (imageId.startsWith("http")) return imageId;
	return `${IMAGE_CDN}/${imageId}`;
};

const RestaurantMenu = () => {
	const { resId } = useParams();
	const [resInfo, setResInfo] = useState(null);

	useEffect(() => {
		if (resId) fetchMenu();
	}, [resId]);

	const fetchMenu = async () => {
		const data = await fetch(`${BASE_URL}/listRestaurantMenu/${resId}`);
		const json = await data.json();
		setResInfo(json);
	};

	if (resInfo === null) {
		return <Shimmer />;
	}

	const infoCard = resInfo?.data?.cards?.[2]?.card?.card?.info;
	const regularCards = resInfo?.data?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards ?? [];

	if (!infoCard) {
		return (
			<main className="menu-page">
				<div className="menu-content">
					<p>Restaurant not found.</p>
				</div>
			</main>
		);
	}

	const { name, cuisines, avgRating, sla, areaName } = infoCard;

	// Parse menu: each card has card.card.title and card.card.itemCards
	const menuSections = regularCards
		.filter((entry) => entry?.card?.card?.title && entry?.card?.card?.itemCards?.length > 0)
		.map((entry) => ({
			title: entry.card.card.title,
			items: entry.card.card.itemCards.map((itemEntry) => {
				const info = itemEntry?.card?.info ?? {};
				return {
					id: info.id,
					name: info.name ?? "—",
					description: info.description ?? "",
					price: info.price ?? info.defaultPrice,
					imageId: info.imageId,
				};
			}),
		}));

	return (
		<main className="menu-page">
			<div className="menu-hero">
				<div className="menu-hero-inner">
					<Link to="/" className="menu-back-link">← Back to restaurants</Link>
					<h1 className="menu-restaurant-name">{name}</h1>
					<p className="menu-cuisines">{Array.isArray(cuisines) ? cuisines.join(" • ") : cuisines}</p>
					<div className="menu-meta">
						<span className="menu-meta-item">
							<span className="menu-meta-label">Rating</span>
							<span className="menu-meta-value">★ {avgRating}</span>
						</span>
						<span className="menu-meta-divider">•</span>
						<span className="menu-meta-item">
							<span className="menu-meta-label">Delivery</span>
							<span className="menu-meta-value">{sla?.slaString ?? "—"}</span>
						</span>
						<span className="menu-meta-divider">•</span>
						<span className="menu-meta-item">
							<span className="menu-meta-label">Area</span>
							<span className="menu-meta-value">{areaName ?? "—"}</span>
						</span>
					</div>
				</div>
			</div>

			<div className="menu-content">
				<h2 className="menu-content-title">Menu</h2>
				{menuSections.length === 0 ? (
					<p className="menu-empty">No menu available.</p>
				) : (
					menuSections.map((section) => (
						<section key={section.title} className="menu-section">
							<h3 className="menu-section-title">{section.title}</h3>
							<ul className="menu-item-list">
								{section.items.map((item) => {
									const imageUrl = getImageUrl(item.imageId);
									return (
										<li key={item.id || item.name} className="menu-item">
											{imageUrl && (
												<div className="menu-item-img-wrap">
													<img src={imageUrl} alt={item.name} className="menu-item-img" />
												</div>
											)}
											<div className="menu-item-info">
												<span className="menu-item-name">{item.name}</span>
												{item.description ? (
													<p className="menu-item-desc">{item.description}</p>
												) : null}
											</div>
											<div className="menu-item-price-wrap">
												<span className="menu-item-price">{formatPrice(item.price)}</span>
												<button type="button" className="menu-item-add-btn">Add</button>
											</div>
										</li>
									);
								})}
							</ul>
						</section>
					))
				)}
			</div>
		</main>
	);
};

export default RestaurantMenu;
