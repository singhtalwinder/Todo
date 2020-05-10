import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import EmailIcon from "@material-ui/icons/Email";

import emailConfirmation from "../API-requests/forgetPassword/sendConfirmationEmail";

const useStyles = makeStyles((theme) => ({
	outerPaper: {
		margin: theme.spacing(2, 0, 2, 0),
	},
	innerPaper: {
		margin: theme.spacing(6, 4),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

function EnterEmail() {
	const classes = useStyles();

	const [values, setValues] = React.useState({
		email: "",
	});

	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const handleClickSubmit = (event) => {
		event.preventDefault();
		emailConfirmation();
	};

	return (
		<Grid container justify="center">
			<CssBaseline />
			<Grid
				item
				xs={12}
				sm={8}
				md={6}
				lg={4}
				component={Paper}
				className={classes.outerPaper}
			>
				<div className={classes.innerPaper}>
					<Typography variant="h5">Enter your email</Typography>
					<form className={classes.form} noValidate>
						<TextField
							variant="outlined"
							margin="normal"
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<EmailIcon />
									</InputAdornment>
								),
							}}
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							value={values.email}
							onChange={handleChange("email")}
							autoComplete="email"
							autoFocus
						/>

						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							onClick={handleClickSubmit}
						>
							Send Confirmation Link
						</Button>
					</form>
				</div>
			</Grid>
		</Grid>
	);
}

export default EnterEmail;
