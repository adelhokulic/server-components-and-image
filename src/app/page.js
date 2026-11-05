import ProductCard from "@/components/ProductCard";
import { getAllProducts } from "@/services/productService";

export default async function Home() {
	const data = await getAllProducts();
	return (
		<>
			<h1>Proizvodi</h1>
			<div className="products">
				{data.products.map((product) => {
					return <ProductCard key={product.id} product={product} />;
				})}
			</div>
		</>
	);
}
