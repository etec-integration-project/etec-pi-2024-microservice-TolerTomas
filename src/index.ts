import "dotenv/config";

import app from "./server";
import axios from "axios";

// import axios from "axios";

const PORT = process.env.PORT || 8080;

let auth_server_token: null | string = null;

app.listen(PORT, () => {
	console.log("[FILE SERVER SERVICE]");
	console.log("[SERVER] listening on port " + PORT);

	while (auth_server_token == null) {
		axios
			.post(`http://${process.env.AUTH_SERVER_ADDRESS as string}/api/servers/login`, {
				username: process.env.AUTH_SERVER_USERNAME,
				password: process.env.AUTH_SERVER_PASSWORD,
			})
			.then(data => {
				if (data.data.error) {
					axios
						.post(`http://${process.env.AUTH_SERVER_ADDRESS as string}/api/servers/register`, {
							username: process.env.AUTH_SERVER_USERNAME,
							password: process.env.AUTH_SERVER_PASSWORD,
						})
						.then(data => {
							auth_server_token = data.data.token;
							console.log({ auth_server_token });							
						})
				}
				auth_server_token = data.data.token;
				console.log({ auth_server_token });
			})
	}
});
