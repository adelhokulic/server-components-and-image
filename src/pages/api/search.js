import { searchProductByQuery } from "@/services/productService";

const Handler = async (req, res) => {
	if (!req.query.pretraga) {
		return res
			.status(400)
			.json({ message: "Niste prosledili parametar za pretragu" });
	}

	const data = await searchProductByQuery(req.query.pretraga);
	res.status(200).json(data.products);
};

export default Handler;
