import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import handleSignUpSubmit from "../API-requests/handleSignUpSubmit";

import Copyright from "./Copyright";

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
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	link: {
		marginTop: theme.spacing(2),
	},
}));

function SignUp(props) {
	const classes = useStyles();

	const [values, setValues] = React.useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
		showPassword: false,
		receiveEmail: false,
	});

	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const handleClickSubmit = (event) => {
		event.preventDefault();
		handleSignUpSubmit(values);
		props.history.push("/resend-confirmation-email");
	};

	const handleClickShowPassword = () => {
		setValues({ ...values, showPassword: !values.showPassword });
	};

	const handleClickReceiveEmail = () => {
		setValues({ ...values, receiveEmail: !values.receiveEmail });
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
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography variant="h5">Sign Up</Typography>
					<form className={classes.form} noValidate>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									variant="outlined"
									margin="normal"
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<AccountCircleIcon />
											</InputAdornment>
										),
									}}
									required
									fullWidth
									id="firstName"
									label="First Name"
									name="firstName"
									value={values.firstName}
									onChange={handleChange("firstName")}
								/>
							</Grid>

							<Grid item xs={12} sm={6}>
								<TextField
									variant="outlined"
									margin="normal"
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<AccountCircleIcon />
											</InputAdornment>
										),
									}}
									required
									fullWidth
									id="lastName"
									label="Last Name"
									name="lastName"
									value={values.lastName}
									onChange={handleChange("lastName")}
								/>
							</Grid>
						</Grid>

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
						<FormControlLabel
							control={
								<Checkbox
									name="receive"
									onChange={handleClickReceiveEmail}
									color="primary"
								/>
							}
							label="I want to receive emails about product updates"
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							onClick={handleClickSubmit}
						>
							Sign Up
						</Button>
						<Grid container alignItems="center" direction="column">
							<Grid item xs className={classes.link}>
								<Link
									onClick={() => {
										props.history.push("/");
									}}
									variant="body2"
								>
									{"Already have an account? Sign In"}
								</Link>
							</Grid>
						</Grid>
					</form>
				</div>
				<Box mt={8}>
					<Copyright />
				</Box>
			</Grid>
		</Grid>
	);
}

export default SignUp;
