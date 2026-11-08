const Handler = async (req, res) => {
	try {
		const response = await fetch("https://dummyjson.com/auth/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				username: req.body.username, //emilys
				password: req.body.password, //emilyspass
				expiresInMins: 30, // optional, defaults to 60
			}),
			credentials: "include", // Include cookies (e.g., accessToken) in the request
		});
		const data = await response.json();
		if (!response.ok) {
			res.status(401).json({ message: "Incorrect username or password." });
			return;
		}
		res
			.status(200)
			.json({ message: "Login successful.", token: data.accessToken });
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({
				message: "Something went wrong on our side. Please try again later.",
			});
	}
};

export default Handler;
