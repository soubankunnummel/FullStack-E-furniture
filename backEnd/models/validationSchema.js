const Joi = require("joi");

const joiUserSchema = Joi.object({
    name:Joi.string(),
    username:Joi.string().alphanum().min(3).max(30).required(),
    email:Joi.string().email(),
    password: Joi.string().required(),
    phone:Joi.number().min(10).max(10),
    gender:Joi.string(),
    address:Joi.string(),
    dob:Joi.date() 
})

const joiProductSchema = Joi.object({
    id:Joi.string(),
    title: Joi.string().required(),
    description:Joi.string(),
    price: Joi.number().positive(),
    image: Joi.string(),
    category:Joi.string(),
    

})

module.exports = { joiUserSchema, joiProductSchema}