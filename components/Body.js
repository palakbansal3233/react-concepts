import { useState, useEffect } from "react";
import RestaurantCard from "./Card";
import Shimmer from "./Shimmer";
import { BASE_URL } from "../utils/constants";

const Body = () => {
	const [allRestaurants, setAllRestaurants] = useState([]);
	const [restaurants, setRestaurants] = useState([]);
	const [searchText, setSearchText] = useState('');

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		const data = await fetch(`${BASE_URL}/listRestaurants`)
		const json = await data.json();
		const list =
			json?.data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants ?? [];
		setAllRestaurants(list);
		setRestaurants(list);
	};

	const filterBtn = () => {
		const filtered = allRestaurants.filter((res) => Number(res.info.avgRating) > 4.3);
		setRestaurants(filtered);
	};

	if (!allRestaurants || allRestaurants.length === 0) {
		return <Shimmer />;
	}

	const handleSearch = () => {
		const query = searchText.trim().toLowerCase();
		const filtered = allRestaurants.filter((res) =>
			res.info.name.toLowerCase().includes(query.toLowerCase())
		);
		setRestaurants(filtered);
	}
 
	return (
		<main className="body">
			<div className="hero">
				<h1 className="hero-title">Craving something delicious?</h1>
				<p className="hero-subtitle">Order from top restaurants near you</p>
				<div className="search-bar">
					<span className="search-icon">📍</span>
					<input type="text" placeholder="Search for restaurant or cuisine" 
						className="search-input" value={searchText} 
						onChange={(e) => {setSearchText(e.target.value)}} />
					<button className="search-btn" onClick={() => {handleSearch()}}>Search</button>
				</div>
				<div className="filter-btn">
					<button onClick={filterBtn}>Top Rated Restaurants</button>
				</div>
			</div>
			<section className="restaurants-section">
				<h2 className="section-title">Restaurants near you</h2>
				<div className="res-grid">
					{restaurants.map((restaurant) => (
						<RestaurantCard key={restaurant.info.id} {...restaurant.info} />
					))}
				</div>
			</section>
		</main>
	);
};

export default Body;