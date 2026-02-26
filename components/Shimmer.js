const Shimmer = () => {
	return (
		<section className="restaurants-section">
			<h2 className="section-title">Restaurants near you</h2>
			<div className="res-grid">
				{Array(8)
					.fill(null)
					.map((_, index) => (
						<div className="res-card shimmer-card" key={index}>
							<div className="card-img-wrap">
								<div className="shimmer-block shimmer-img" />
							</div>
							<div className="card-content">
								<div className="shimmer-block shimmer-line shimmer-line-lg" />
								<div className="shimmer-block shimmer-line" />
								<div className="shimmer-block shimmer-line shimmer-line-sm" />
							</div>
						</div>
					))}
			</div>
		</section>
	);
};

export default Shimmer;

