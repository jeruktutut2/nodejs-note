import Joi from "joi";

export const registerUserValidation = Joi.object({
    username: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
});

export const loginUserValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
});