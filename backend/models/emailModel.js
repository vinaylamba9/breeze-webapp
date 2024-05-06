const mongoose = require('mongoose');

const emailModel = mongoose.Schema({
    title: {
        unique: true,
        type: String,
    },
    description: {
        type: String,
    },
    body: {
        type: String,
    },
    status: {
        type: Number,
    },
    createdAt: {
        type: String,
    },
    createdBy: {
        type: String,
    },
});

module.exports = mongoose.model('emailModel', emailModel);
