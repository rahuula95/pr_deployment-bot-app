const mongoose = require('mongoose');

const databaseUri = 'mongodb://prdeploymentbot-app-server:wXis3kI1bRb56J9A62zJfqNmP0E1SMqIygyZzSbUNxztfRY7ESq38UEtIrKL45rs5yy4mi0zMRPnwMwCHqPHDQ==@prdeploymentbot-app-server.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@prdeploymentbot-app-server'
const dbName = 'PRTrackerDB'
const connectionUrl = databaseUri + "/" + dbName

mongoose.connect(connectionUrl, {
    useNewUrlParser: true
}, (err) => {
    if (!err) {
        console.log('Successfully Established Connection with MongoDB')
    } else {
        console.log('Failed to Establish Connection with MongoDB with Error: ' + err)
    }
});

//Connecting Node and MongoDB
require('./input.model');