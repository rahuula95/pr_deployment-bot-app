const mongoose = require('mongoose');

//Attributes of the Course object
var inputSchema = new mongoose.Schema({
    pullRequestId: {
        type: String,
        required: 'This field is required!'
    },
    email: {
        type: String,
        required: 'This field is required!'
    },
    trackingEnvironment: {
        type: String
    },
    validationScript: {
        type: String
    }
});

mongoose.model('Input', inputSchema);