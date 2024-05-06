const mongoose = require("mongoose")
const { MasterConstantsStatus } = require("../constants/application")
require("dotenv").config()
const SchemaTypes = mongoose.Schema.Types
require("mongoose-long")(mongoose)

const masterConstantModel = mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String
    },
    data: {
        type: Object
    },
    category: {
        type: Number
    },
    status: {
        type: Number,
        default: MasterConstantsStatus.ACTIVE
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('masterConstantModel', masterConstantModel);