"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const SearchBar = ({ children }) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [timer, setTimer] = useState(null);
	const [searchResults, setSearchResults] = useState([]);
	const [isSearching, setIsSearching] = useState(false);
	const search = async (searchTerm) => {
		const response = await fetch(
			"http://localhost:3000/api/search?pretraga=" + searchTerm,
		);
		const data = await response.json();
		setIsSearching(false);
		setSearchResults(data);
	};

	useEffect(() => {
		if (!searchTerm.trim()) {
			setIsSearching(false);
			setSearchResults([]);
			return;
		}
		setIsSearching(true);
		if (timer) {
			clearTimeout(timer);
		}
		const newTimer = setTimeout(() => {
			search(searchTerm);
		}, 300);

		setTimer(newTimer);

		return () => clearTimeout(newTimer);
	}, [searchTerm]);
	return (
		<>
			<form className="search-bar">
				<input
					type="text"
					onChange={(e) => setSearchTerm(e.target.value)}
					className="search-input"
					placeholder="Unesite stavku za pretragu"
				/>
			</form>
			{searchTerm.trim() ? (
				<>
					<h1>Proizvodi</h1>
					{searchResults.length === 0 && !isSearching && (
						<p className="not-found">Proizvod ne postoji sa tim nazivom</p>
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
