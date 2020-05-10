import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import LockIcon from "@material-ui/icons/Lock";

import resetPassword from "../API-requests/forgetPassword/resetPassword";

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

function ResetPassword(props) {
	const classes = useStyles();

	const [values, setValues] = React.useState({
		password: "",
		confirmPassword: "",
		showPassword: false,
	});

	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const handleClickSubmit = (event) => {
		event.preventDefault();
		resetPassword(values, () => {
			props.history.push("/");
		});
	};

	const handleClickShowPassword = () => {
		setValues({ ...values, showPassword: !values.showPassword });
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
					<Typography variant="h5">Enter your new password</Typography>
					<form className={classes.form} noValidate>
						<TextField
							variant="outlined"
							margin="normal"
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<LockIcon />
									</InputAdornment>
								),
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
										>
											{values.showPassword ? <Visibility /> : <VisibilityOff />}
										</IconButton>
									</InputAdornment>
								),
							}}
							required
							fullWidth
							name="password"
							value={values.password}
							onChange={handleChange("password")}
							label="Password"
							type={values.showPassword ? "text" : "password"}
							id="password"
							autoComplete="current-password"
						/>
						<TextField
							variant="outlined"
							margin="normal"
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<LockIcon />
									</InputAdornment>
								),
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
										>
											{values.showPassword ? <Visibility /> : <VisibilityOff />}
										</IconButton>
									</InputAdornment>
								),
							}}
							required
							fullWidth
							name="confirmPassword"
							value={values.confirmPassword}
							onChange={handleChange("confirmPassword")}
							label="Confirm Password"
							type={values.showPassword ? "text" : "password"}
							id="confirmPassword"
							autoComplete="current-password"
						/>

						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							onClick={handleClickSubmit}
						>
							Reset Password
						</Button>
					</form>
				</div>
			</Grid>
		</Grid>
	);
}

export default ResetPassword;
