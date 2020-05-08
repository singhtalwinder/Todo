import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";

import sendConfirmationEmail from "../API-requests/sendConfirmationEmail";

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
	text: {
		margin: theme.spacing(0, 0, 4, 0),
	},
}));

function ResendConfirmationEmail() {
	const classes = useStyles();

	return (
		<Grid container justify="center">
			<CssBaseline />
			<Grid
				item
				xs={12}
				sm={10}
				md={8}
				lg={6}
				component={Paper}
				className={classes.outerPaper}
			>
				<div className={classes.innerPaper}>
					<Typography variant="h4" className={classes.text}>
						Almost there!
					</Typography>
					<Typography variant="h5" className={classes.text}>
						We have sent you a verification link.
					</Typography>
					<Typography variant="h5" className={classes.text}>
						Click on the button below if you didn't receive the email.
					</Typography>
					<Button
						type="button"
						variant="contained"
						color="primary"
						className={classes.text}
						onClick={sendConfirmationEmail}
					>
						Resend
					</Button>
				</div>
			</Grid>
		</Grid>
	);
}

export default ResendConfirmationEmail;
