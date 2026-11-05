"use client";
import ProductCard from "@/components/ProductCard";
import { useState } from "react";

const Register = () => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");
	const [thumbnail, setThumbnail] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [addedProduct, setAddedProduct] = useState(null);

	const addProduct = async () => {
		if (
			title.trim() === "" ||
			description.trim() === "" ||
			price === "" ||
			thumbnail.trim() === "" ||
			!thumbnail.startsWith("https://cdn.dummyjson.com/")
		) {
			setErrorMessage("Invalid data. Please check all fields.");
			return;
		}
		const response = await fetch("/api/register", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				title: title,
				description: description,
				price: Number(price),
				thumbnail: thumbnail,
			}),
		});
		const data = await response.json();
		setAddedProduct(data);
		setTitle("");
		setDescription("");
		setPrice("");
		setThumbnail("");
		setErrorMessage("");
	};
	return (
		<main className="register-page">
			<a href="/" className="back-link">
				← Back To Products
			</a>
			<h1>Add Product</h1>

			<form className="product-form">
				<label htmlFor="title">Title</label>
				<input
					type="text"
					id="title"
					name="title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>

				<label htmlFor="description">Description</label>
				<textarea
					id="description"
					name="description"
					rows="4"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>

				<label htmlFor="price">Price ($)</label>
				<input
					type="number"
					id="price"
					name="price"
					min="0"
					step="0.01"
					value={price}
					onChange={(e) => setPrice(e.target.value)}
				/>

				<label htmlFor="thumbnail">Thumbnail</label>
				<input
					type="text"
					id="thumbnail"
					name="thumbnail"
					value={thumbnail}
					onChange={(e) => setThumbnail(e.target.value)}
				/>
				<p className="form-hint">
					USE FOR TEST:
					https://cdn.dummyjson.com/product-images/beauty/powder-canister/thumbnail.webp
				</p>

				{errorMessage && <p className="form-error">{errorMessage}</p>}

				<button type="button" className="btn" onClick={addProduct}>
					Add Product
				</button>
			</form>
			{addedProduct && <ProductCard product={addedProduct} />}
		</main>
	);
};

export default Register;
