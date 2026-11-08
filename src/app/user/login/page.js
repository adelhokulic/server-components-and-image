"use client";
import { useState } from "react";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const loginUser = async (e) => {
		e.preventDefault();
		if (username.trim() === "" || password.trim() === "") {
			setErrorMessage("Please enter both your username and password.");
			return;
		}

		const response = await fetch("/api/auth_user", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				username: username,
				password: password,
				expiresInMins: 30, // optional, defaults to 60
			}),
			credentials: "include", // Include cookies (e.g., accessToken) in the request
		});

		if (response.status !== 200) {
			setErrorMessage("We couldn't log you in. Please try again.");
			return;
		}
		setErrorMessage("");

		const data = await response.json();
		localStorage.setItem("token", data.token);
	};

	return (
		<main className="login-page">
			<h1>Login</h1>

			<form onSubmit={loginUser} className="product-form">
				<label htmlFor="username">Username</label>
				<input
					type="text"
					id="username"
					name="username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>

				<label htmlFor="password">Password</label>
				<input
					id="password"
					name="password"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				{errorMessage && <p className="form-error">{errorMessage}</p>}
				<button type="submit" className="btn">
					Login
				</button>
			</form>
		</main>
	);
};

export default Login;
