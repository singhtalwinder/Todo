import axios from "axios";

function sendConfirmationEmail() {
	axios
		.get("/api/user/send-confirmation-email")
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

export default sendConfirmationEmail;
