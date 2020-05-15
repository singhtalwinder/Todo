import axios from "axios";

function handleSignInSubmit({ email, password, rememberMe } = {}, callBack) {
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
			if (callBack) callBack();
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
