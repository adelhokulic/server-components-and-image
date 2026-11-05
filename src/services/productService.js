export const getAllProducts = async (limit = 9) => {
	const response = await fetch(
		`${process.env.PRODUCT_API_URL}products?limit=${limit}`,
		{
			next: {
				revalidate: 3600,
			},
		},
	);
	return await response.json();
};

export const getProductById = async (productId) => {
	const response = await fetch(
		`${process.env.PRODUCT_API_URL}products/${productId}`,
	);
	if (response.status === 404) {
		return false;
	}
	return await response.json();
};

export const searchProductByQuery = async (query) => {
	const response = await fetch(
		`${process.env.PRODUCT_API_URL}products/search?q=${query}`,
	);
	return await response.json();
};

export const addProduct = async (title, description, price, thumbnail) => {
	const response = await fetch(`${process.env.PRODUCT_API_URL}products/add`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			title: title,
			description: description,
			price: Number(price),
			thumbnail: thumbnail,
		}),
	});
	return await response.json();
};
