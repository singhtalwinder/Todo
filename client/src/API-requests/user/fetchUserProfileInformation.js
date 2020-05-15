import axios from "axios";

function fetchUserProfileInformation(callback) {
	axios({
		method: "get",
		url: "/api/user/user-information",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((response) => {
			if (callback) callback(response.data);
		})
		.catch((err) => {
			if (err.response) {
				alert(err.response.data);
			} else {
				alert("Request falied");
			}
		});
}

export default fetchUserProfileInformation;
