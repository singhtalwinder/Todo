import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import LinearProgress from "@material-ui/core/LinearProgress";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";

import Copyright from "./copyright";

const useStyles = makeStyles((theme) => ({
	outerPaper: {
		margin: theme.spacing(5, 0, 0, 0),
	},
	innerPaper: {
		margin: theme.spacing(8, 4),
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

function SignIn(props) {
	const classes = useStyles();

	const [values, setValues] = React.useState({
		email: "",
		password: "",
		rememberMe: false,
		showPassword: false,
		isLoading: false,
	});

	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		handleLoading();
		console.log(values);
	};

	const handleClickShowPassword = () => {
		setValues({ ...values, showPassword: !values.showPassword });
	};

	const handleRememberMe = () => {
		setValues({ ...values, rememberMe: !values.rememberMe });
	};

	const handleLoading = () => {
		setValues({ ...values, isLoading: !values.isLoading });
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
				{(() => {
					if (values.isLoading) return <LinearProgress />;
				})()}
				<div className={classes.innerPaper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography variant="h5">Sign in</Typography>
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
						<FormControlLabel
							control={
								<Checkbox
									name="rememberMe"
									onChange={handleRememberMe}
									color="primary"
								/>
							}
							label="Remember me"
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							onClick={handleSubmit}
						>
							Sign In
						</Button>
						<Grid container alignItems="center" direction="column">
							<Grid item xs className={classes.link}>
								<Link href="#" variant="body2">
									{"Forgot password?"}
								</Link>
							</Grid>
							<Grid item xs className={classes.link}>
								<Link
									onClick={() => {
										props.history.push("/signup");
									}}
									variant="body2"
								>
									{"Don't have an account? Sign Up"}
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

export default SignIn;
