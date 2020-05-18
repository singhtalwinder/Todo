import axios from "axios";

function fetchFinishedTodos(callback, errCallback) {
	axios({
		method: "get",
		url: "/api/user/finished-todos",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((response) => {
			if (callback) callback(response.data);
		})
		.catch((err) => {
			if (err.response) {
				if (errCallback) errCallback();
				else alert(err.response.data);
			} else {
				alert("Request falied");
			}
		});
}

export default fetchFinishedTodos;
