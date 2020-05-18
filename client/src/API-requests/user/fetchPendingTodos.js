import axios from "axios";

function fetchPendingTodos(callback) {
	axios({
		method: "get",
		url: "/api/user/pending-todos",
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

export default fetchPendingTodos;
