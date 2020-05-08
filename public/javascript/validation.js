const Joi = require("@hapi/joi");

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

module.exports.signupValidation = signupValidation;
module.exports.signinValidation = signinValidation;
