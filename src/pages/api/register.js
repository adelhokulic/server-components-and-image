import { addProduct } from "@/services/productService";

const Handler = async (req, res) => {
	const newProduct = await addProduct(
		req.body.title,
		req.body.description,
		req.body.price,
		req.body.thumbnail,
	);
	res.status(201).json(newProduct);
};

export default Handler;
