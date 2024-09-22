import "dotenv/config";

import app from "./server";

import axios from "axios";

const PORT = process.env.PORT || 8080;

let auth_server_token;

app.listen(PORT, () => {
	console.log("[FILE SERVER SERVICE]");
	console.log("[SERVER] listening on port " + PORT);

	axios
		.post(
			"/api/servers/login", // (("http://" + process.env.AUTH_SERVER_ADDRESS) as string) + ":5050/api/servers/login", 
			{
				name: process.env.AUTH_SERVER_USERNAME as string,
				password: process.env.AUTH_SERVER_PASSWORD as string,
			}
		)
		.then((data) => {
			// not registered
			if (data.data.error) {
				axios
					.post(
						//(("http://" + process.env.AUTH_SERVER_ADDRESS) as string) + ":5050/api/servers/register",
						"/api/servers/login",
						{
							name: process.env.AUTH_SERVER_USERNAME as string,
							password: process.env.AUTH_SERVER_PASSWORD as string,
						}
					)
					.then((data) => {
						auth_server_token = data.data.token;
						console.log({ auth_server_token });
						return;
					});
			}
			auth_server_token = data.data.token;
			console.log({ auth_server_token });
			return;
		});
});
