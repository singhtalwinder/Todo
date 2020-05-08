import React from "react";
import Button from "@material-ui/core/Button";
import handleSignOut from "../API-requests/handleSignOut";
import refreshAuthToken from "../API-requests/refreshAuthToken";

function Dashboard(props) {
	const silentRefresh = setInterval(refreshAuthToken, 4000);

	const handleClickSignOut = () => {
		clearInterval(silentRefresh);
		handleSignOut(() => {
			props.history.push("/");
		});
	};
	return (
		<React.Fragment>
			<p>Hello</p>
			<Button
				type="button"
				variant="contained"
				color="primary"
				onClick={handleClickSignOut}
			>
				SignOut
			</Button>
		</React.Fragment>
	);
}

export default Dashboard;
