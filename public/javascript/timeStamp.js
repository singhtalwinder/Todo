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

module.exports = timeStamp;
