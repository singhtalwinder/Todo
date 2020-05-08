import axios from "axios";

function handleSignInSubmit(
	{ email, password, rememberMe } = {},
	redirectToDashboard
) {
	axios({
		method: "post",
		url: "/api/user/sign-in",
		data: {
			email: email,
			password: password,
			rememberMe: rememberMe,
		},
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((response) => {
			redirectToDashboard();
		})
		.catch((err) => {
			if (err.response) {
				alert(err.response.data);
			} else {
				alert("Request falied");
			}
		});
}

export default handleSignInSubmit;
