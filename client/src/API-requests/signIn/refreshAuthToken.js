import axios from "axios";

function refreshAuthToken(redirect) {
	axios({
		method: "get",
		url: "/api/user/refresh-auth-token",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((response) => {
			if (redirect) redirect();
		})
		.catch((err) => {
			if (err.response) {
				alert(err.response.data);
			} else {
				alert("Request falied");
			}
		});
}

export default refreshAuthToken;
