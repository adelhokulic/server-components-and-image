"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const SearchBar = ({ children }) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [isSearching, setIsSearching] = useState(false);
	const search = async (searchTerm, signal) => {
		try {
			const response = await fetch(
				"http://localhost:3000/api/search?pretraga=" + searchTerm,
				{ signal },
			);
			const data = await response.json();
			setIsSearching(false);
			setSearchResults(data);
		} catch (error) {
			if (error.name === "AbortError") {
				return;
			}
			console.error(error);
		}
	};

	useEffect(() => {
		if (!searchTerm.trim()) {
			setIsSearching(false);
			setSearchResults([]);
			return;
		}
		setIsSearching(true);

		const controller = new AbortController();
		const newTimer = setTimeout(() => {
			search(searchTerm, controller.signal);
		}, 300);
		return () => {
			clearTimeout(newTimer);
			controller.abort();
		};
	}, [searchTerm]);
	return (
		<>
			<form className="search-bar">
				<input
					type="text"
					onChange={(e) => setSearchTerm(e.target.value)}
					className="search-input"
					placeholder="Type Product Name...."
				/>
			</form>
			{searchTerm.trim() ? (
				<>
					<h1>Products</h1>
					{searchResults.length === 0 && !isSearching && (
						<p className="not-found">No product found with that name“</p>
					)}

					<div className="products">
						{searchResults.map((product) => {
							return <ProductCard key={product.id} product={product} />;
						})}
					</div>
				</>
			) : (
				children
			)}
		</>
	);
};

export default SearchBar;
