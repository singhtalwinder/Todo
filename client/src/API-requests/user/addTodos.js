import axios from "axios";

function addTodos(dateTime, description) {
	axios({
		method: "post",
		url: "/api/user/add-todos",
		headers: {
			"Content-Type": "application/json",
		},
		data: {
			dateTime: dateTime,
			description: description,
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

export default addTodos;
