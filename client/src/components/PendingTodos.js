import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import Grid from "@material-ui/core/Grid";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import fetchPendingTodos from "../API-requests/user/fetchPendingTodos";

function PendingTodos() {
	const [Loading, handleLoading] = React.useState(true);
	const [noTodos, handleNoTodos] = React.useState(false);
	const [pendingTodos, handlePendingTodos] = React.useState(() => {
		let pendingTodos = {};
		fetchPendingTodos(
			(data) => {
				pendingTodos.data = data;
				handleLoading(false);
			},
			() => {
				handleNoTodos(true);
				handleLoading(false);
			}
		);
		return pendingTodos;
	});

	if (Loading) return <LinearProgress />;
	if (noTodos)
		return (
			<Grid container justify="center">
				<Typography variant="h5">Nothing here!</Typography>
			</Grid>
		);

	return (
		<Grid container justify="center">
			<Grid item xs={12} sm={12} md={12} lg={6} component={Paper}>
				<TableContainer>
					<Table aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell align="left">Description</TableCell>
								<TableCell align="left">DateTime</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{pendingTodos.data.map((data) => (
								<TableRow key={data.reg_date + data.dateTime}>
									<TableCell component="th" scope="row">
										{data.description}
									</TableCell>
									<TableCell align="left">{data.dateTime}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Grid>
		</Grid>
	);
}

export default PendingTodos;
