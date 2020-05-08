import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ResendConfirmationEmail from "./components/ResendConfirmationEmail";
import Dashboard from "./components/Dashboard";

function App() {
	return (
		<React.Fragment>
			<Router>
				{(() => {
					if (getCookie("rememberMe") === "yes") {
						return <Redirect to="/dashboard" />;
					}
				})()}
				<Switch>
					<Route exact path="/" component={SignIn} />
					<Route exact path="/sign-up" component={SignUp} />
					<Route
						exact
						path="/resend-confirmation-email"
						component={ResendConfirmationEmail}
					/>
					<ProtectedRoute exact path="/dashboard" component={Dashboard} />
				</Switch>
			</Router>
		</React.Fragment>
	);
}

const ProtectedRoute = ({ component: Component, ...rest }) => {
	alert(getCookie("rememberMe"));
	if (!getCookie("rememberMe")) {
		return <Redirect to="/" />;
	}

	return (
		<Route
			{...rest}
			render={(props) => {
				return <Component {...props} />;
			}}
		/>
	);
};

function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(";");
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) === " ") {
			c = c.substring(1);
		}
		if (c.indexOf(name) === 0) {
			return c.substring(name.length, c.length);
		}
	}
	return null;
}

export default App;
