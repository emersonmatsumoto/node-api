var express = require('express'),
    wine = require('./routes/wines'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    app = express();
    
var db = require('./db');
    
app.use(morgan('dev'));  /* 'default', 'short', 'tiny', 'dev' */
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/wines', require('./routes/wines'));

// Connect to Mongo on start
db.connect('mongodb://localhost:27017/winedb', function(err) {
    if (err) {
        console.log('Unable to connect to Mongo.');
        process.exit(1);
    } else {
        app.listen(3000, function() {
            console.log('Listening on port 3000...');
        });
    }   
});
