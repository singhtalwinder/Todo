import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import Grid from "@material-ui/core/Grid";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

function MyProfile(props) {
	return (
		<Grid container justify="center">
			<Grid item xs={12} sm={12} md={12} lg={6} component={Paper}>
				<TableContainer>
					<Table aria-label="simple table">
						<caption>Edit profile feature Coming soon!</caption>
						<TableBody>
							<TableRow>
								<TableCell component="th" scope="row">
									First Name
								</TableCell>
								<TableCell align="left">
									{props.profileInformation.firstName}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell component="th" scope="row">
									Last Name
								</TableCell>
								<TableCell align="left">
									{props.profileInformation.lastName}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell component="th" scope="row">
									Email
								</TableCell>
								<TableCell align="left">
									{props.profileInformation.email}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell component="th" scope="row">
									Receive Email on Product Updates
								</TableCell>
								<TableCell align="left">
									{(() => {
										if (props.profileInformation.receiveEmail) {
											return "Yes";
										} else {
											return "No";
										}
									})()}
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
			</Grid>
		</Grid>
	);
}

export default MyProfile;
