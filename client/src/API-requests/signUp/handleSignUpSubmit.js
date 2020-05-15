import axios from "axios";

import sendConfirmationEmail from "./sendConfirmationEmail";

function handleSignUpSubmit(
	{ firstName, lastName, email, password, confirmPassword, receiveEmail } = {},
	redirect
) {
	axios({
		method: "post",
		url: "/api/user/sign-up",
		data: {
			firstName: firstName,
			lastName: lastName,
			email: email,
			password: password,
			confirmPassword: confirmPassword,
			receiveEmail: receiveEmail,
		},
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((response) => {
			sendConfirmationEmail();
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

export default handleSignUpSubmit;
