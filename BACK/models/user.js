const mongoose = require('mongoose')

const mongooseUniqueValidator = require('mongoose-unique-validator')

var userSchema = mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }
})
userSchema.plugin(mongooseUniqueValidator)

module.exports = mongoose.model("user",userSchema)