require('./models/mongodb');

//Import the necessary packages
const express = require('express');
var app = express();
const path = require('path');
var exphb = require('express-handlebars');
const bodyparser = require('body-parser');

const mongoose = require('mongoose');
const Input = mongoose.model('Input');

app.use(bodyparser.urlencoded({
    extended: true
}));

//Create a welcome message and direct them to the main page
// app.get('/', (req, res) => {
//             res.send('<body background="/background.jpg"> <h2 style="font-family: Malgun Gothic; color: midnightblue ">PR Tracker</h2>Click Here to go to track a PR <b> <a href="/course">Register</a> </b></body>');
//            });

app.use(express.static(__dirname + "/static"));

app.get('/', function(request, response) {
	// Render login template
	response.sendFile(path.join(__dirname + '/register.html'));
});

app.post('/saveData', function(req, res){
    insertIntoMongoDB(req, res);
});

app.get('/entries', function(req, res) {
	// Render login template
    Input.find((err, docs) => {
        if (!err) {
            //res.sendFile(path.join(__dirname + '/register.html'));
            res.render("entries", {
                list: docs
            });
        } else {
            console.log('Failed to retrieve the entries list: ' + err);
        }
    }).lean();
});


//Creating function to insert data into MongoDB
function insertIntoMongoDB(req, res) {
    console.log(JSON.stringify(req.body))
    var input = new Input();
    input.pullRequestId = req.body.pr_id;
    input.email = req.body.your_email;
    input.trackingEnvironment = req.body.tracking_env;
    input.validationScript = req.body.validation_script;
    input.save((err, doc) => {
        if (!err)
            res.redirect('/entries')
        else
            console.log('Error during record insertion : ' + err);
    });
}

        //Configuring Express middleware for the handlebars
        app.set('views', path.join(__dirname, '/views/'));

        var hbs  = exphb.create({ extname: 'hbs', defaultLayout: 'mainLayout', layoutDir: __dirname + 'views/layouts/' })
        app.engine('hbs', hbs .engine);

        app.set('view engine', 'hbs');

        //Establish the server connection
        //PORT ENVIRONMENT VARIABLE
        const port = process.env.PORT || 8080; app.listen(port, () => console.log(`Listening on port ${port}..`));
