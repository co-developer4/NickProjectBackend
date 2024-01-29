const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    multer = require('multer'),
    dotenv = require('dotenv'),
    cors = require('cors'),
    passport = require('passport'),
    cookieParser = require('cookie-parser');

dotenv.config()

const logger = require('morgan');

const userRoute = require('./routes/users');
const initializeDB = require('./utilis/initializeDB');

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(logger('dev'));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
require('./passport.config.js')(passport);
app.use(passport.initialize())

app.use('/users', userRoute)


const port = process.env.PORT || 4728

if( process.env.NODE_ENV == 'production' ){
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
}

initializeDB.init()

app.listen(port, ()=>{
    console.log(`current server is runnint on http://localhost:${port}`)
})