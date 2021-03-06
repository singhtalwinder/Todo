const Joi = require("@hapi/joi").extend(require("@hapi/joi-date"));
const timeStamp = require("./timeStamp");

//Validation schema for signup information
const signupValidation = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().min(1).max(20).required(),
		lastName: Joi.string().min(1).max(20).required(),
		email: Joi.string().min(6).max(50).required().email(),
		password: Joi.string().min(6).max(20).required(),
		confirmPassword: Joi.string().required(),
		receiveEmail: Joi.boolean().required(),
	});
	return schema.validate(data);
};

//Validation schema for signin information
const signinValidation = (data) => {
	const schema = Joi.object({
		email: Joi.string().required().email(),
		password: Joi.string().required(),
		rememberMe: Joi.boolean().required(),
	});
	return schema.validate(data);
};

//Reset password schema
const resetPasswordValidation = (data) => {
	const schema = Joi.object({
		password: Joi.string().min(6).max(20).required(),
		confirmPassword: Joi.string().required(),
	});
	return schema.validate(data);
};

//Add Todos schema
const addTodosValidation = (data) => {
	const schema = Joi.object({
		dateTime: Joi.date().required().min("now"),
		description: Joi.string().min(2).max(25).required(),
	});
	return schema.validate(data);
};

//Send Reminder Schema
const sendReminderValidation = (data) => {
	const schema = Joi.object({
		dateTime: Joi.date().required().max("now"),
	});
	return schema.validate(data);
};

//Delete Not Verified User Schema
const deleteNotVerifiedUserValidation = (data) => {
	let maxDate = Date(new Date().getTime() - 15 * 60000);
	maxDate = timeStamp(maxDate);
	const schema = Joi.object({
		reg_date: Joi.date().required().max(maxDate),
	});
	return schema.validate(data);
};

module.exports.signupValidation = signupValidation;
module.exports.signinValidation = signinValidation;
module.exports.resetPasswordValidation = resetPasswordValidation;
module.exports.addTodosValidation = addTodosValidation;
module.exports.sendReminderValidation = sendReminderValidation;
module.exports.deleteNotVerifiedUserValidation = deleteNotVerifiedUserValidation;
