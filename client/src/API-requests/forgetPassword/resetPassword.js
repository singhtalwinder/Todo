import axios from "axios";

function resetPassword({ password, confirmPassword } = {}, redirect) {
	axios({
		method: "post",
		url: "/api/user/forget-password/reset-password",
		data: {
			password: password,
			confirmPassword: confirmPassword,
		},
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((response) => {
			alert(response.data);
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

export default resetPassword;
