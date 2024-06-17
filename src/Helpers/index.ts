

import Joi from 'joi'



export const RegisterSchema= Joi.object({
    UserName:Joi.string().required(),
    Email: Joi.string().required().email().messages({
        'string.empty':'Please enter an Email',
        'string.email':"Please enter a valid email"
    }),
    UserPassword:Joi.string().required().pattern(
        new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$')
    )
})