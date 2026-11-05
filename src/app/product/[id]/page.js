import Image from "next/image";

const ProductId = async ({ params }) => {
	const paramsResponse = await params;

	const apiResponse = await fetch(`https://dummyjson.com/products/${paramsResponse.id}`);

	const data = await apiResponse.json();

	return (
		<main className="product-page">
			<a href="/" className="back-link">
				← Nazad na proizvode
			</a>

			<div className="product-top">
				<div className="product-gallery">
					{data.images.map((image) => {
						return (
							<Image
								key={image}
								src={image}
								alt={`${data.title}`}
								width="600"
								height="600"
							/>
						);
					})}
				</div>

				<div className="product-info">
					<p className="product-category">{data.category}</p>
					<h1>{data.title}</h1>
					<p className="product-rating">★ {data.rating} / 5</p>
					<p className="product-description">{data.description}</p>

					<div className="product-price-row">
						<p className="price">{data.price} $</p>
						<span className="discount">-{data.discountPercentage}%</span>
					</div>

					<div className="product-stock">
						<span className="badge">{data.availabilityStatus}</span>
						<span>Na stanju: {data.stock}</span>
					</div>

				</div>
			</div>
		</main>
	);
};

export default ProductId;
