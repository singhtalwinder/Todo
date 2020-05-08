import axios from "axios";

function handleSignOut(redirectToLogin) {
	axios({
		method: "delete",
		url: "/api/user/sign-out",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((response) => {
			redirectToLogin();
		})
		.catch((err) => {
			if (err.response) {
				alert(err.response.data);
			} else {
				alert("Request falied");
			}
		});
}

export default handleSignOut;
