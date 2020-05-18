import React from "react";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import {
	KeyboardDateTimePicker,
	MuiPickersUtilsProvider,
} from "@material-ui/pickers";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import addTodos from "../API-requests/user/addTodos";

const useStyles = makeStyles((theme) => ({
	description: {
		marginTop: theme.spacing(2),
	},
}));

function AddTodos() {
	const classes = useStyles();

	const [selectedDateTime, setselectedDateTime] = React.useState(new Date());
	const [description, setDescription] = React.useState("");

	const handleChangeDescription = (event) => {
		setDescription(event.target.value);
	};

	const handleSubmit = () => {
		console.log(selectedDateTime);
		addTodos(timeStamp(selectedDateTime), description);
	};

	const handleDateChange = (date) => {
		setselectedDateTime(date);
	};

	const timeStamp = (dateTime) => {
		const monthNumber = new Map([
			["Jan", "01"],
			["Feb", "02"],
			["Mar", "03"],
			["Apr", "04"],
			["May", "05"],
			["Jun", "06"],
			["Jul", "07"],
			["Aug", "08"],
			["Sep", "09"],
			["Oct", "10"],
			["Nov", "11"],
			["Dec", "12"],
		]);
		const fields = dateTime.toString().split(" ");
		let timeStamp =
			fields[3] +
			"-" + //yyyy-
			monthNumber.get(fields[1]) +
			"-" + //yyyy-mm-
			fields[2] +
			" " + //yyyy-mm-dd
			fields[4]; //yyyy-mm-dd hh:mm:ss
		return timeStamp;
	};

	return (
		<React.Fragment>
			<Grid container justify="center">
				<Grid
					item
					xs={12}
					sm={8}
					md={10}
					lg={7}
					className={classes.description}
				>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<KeyboardDateTimePicker
							fullWidth
							variant="inline"
							ampm={false}
							label="Date Time"
							value={selectedDateTime}
							onChange={handleDateChange}
							onError={console.log}
							disablePast
							format="yyyy/MM/dd HH:mm"
						/>
					</MuiPickersUtilsProvider>
				</Grid>
				<Grid
					item
					xs={12}
					sm={8}
					md={10}
					lg={7}
					className={classes.description}
				>
					<TextField
						fullWidth
						pt={8}
						id="description"
						label="Description"
						variant="outlined"
						value={description}
						onChange={handleChangeDescription}
					/>
					<FormHelperText id="standard-weight-helper-text">
						Not more than 25 characters
					</FormHelperText>
				</Grid>
				<Grid
					item
					xs={12}
					sm={8}
					md={10}
					lg={7}
					className={classes.description}
				>
					<Button
						fullWidth
						type="submit"
						variant="contained"
						color="primary"
						className={classes.description}
						onClick={handleSubmit}
					>
						Add
					</Button>
				</Grid>
			</Grid>
		</React.Fragment>
	);
}

export default AddTodos;
