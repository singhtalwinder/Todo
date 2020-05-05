import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./components/signin";
import SignUp from "./components/signup";

function App() {
	return (
		<React.Fragment>
			<Router>
				<Switch>
					<Route path="/" exact component={SignIn} />
					<Route path="/signup" exact component={SignUp} />
				</Switch>
			</Router>
		</React.Fragment>
	);
}

export default App;
