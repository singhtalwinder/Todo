import axios from "axios";

function emailConfirmation({ email } = {}) {
	axios({
		method: "post",
		url: "/api/user/forget-password/send-confirmation-email",
		data: {
			email: email,
		},
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((response) => {
			alert(response.data);
		})
		.catch((err) => {
			if (err.response) {
				alert(err.response.data);
			} else {
				alert("Request falied");
			}
		});
}

export default emailConfirmation;
