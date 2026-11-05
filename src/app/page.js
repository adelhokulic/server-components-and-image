import ProductCard from "@/components/ProductCard";
import { getAllProducts } from "@/services/productService";

export default async function Home() {
	const data = await getAllProducts();
	return (
		<>
			<a href="/product/register" className="add-product-btn">
				+ Add New Product
			</a>

			<h1>Products</h1>
			<div className="products">
				{data.products.map((product) => {
					return <ProductCard key={product.id} product={product} />;
				})}
			</div>
		</>
	);
}
