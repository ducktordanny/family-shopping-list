const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');
const connectDB = require('./config/db');

// config
dotenv.config({ path: './config/config.env' });

// passport config
require('./config/passport')(passport);

connectDB();

const app = express();
app.use(express.json());

// log
if (process.env.NODE_ENV === 'developement') {
	app.use(morgan('dev'));
}

app.set('view engine', 'ejs');

app.use(session({
	resave: false,
	saveUninitialized: true,
	secret: 'SECRET'
}));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use('/', require('./routes'));
app.use('/auth', require('./routes/auth'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
