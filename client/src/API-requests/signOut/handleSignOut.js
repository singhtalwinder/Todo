import axios from "axios";

function handleSignOut(redirect) {
	axios({
		method: "delete",
		url: "/api/user/sign-out",
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

export default handleSignOut;
