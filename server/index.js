const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const passport = require('passport');
const connectDB = require('./config/db');
const { authToken } = require('./middleware/auth');

// config
dotenv.config({ path: './config/config.env' });

connectDB();

// passport config
require('./config/passport')(passport);

const app = express();
app.use(express.json());

// log
if (process.env.NODE_ENV === 'developement') {
	app.use(morgan('dev'));
}

app.set('view engine', 'ejs');

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use('/', require('./routes'));
app.use('/auth', require('./routes/auth'));
app.use('/app/auth', require('./routes/auth'));
app.use('/token', authToken, require('./routes/token'));
app.use('/users', authToken, require('./routes/users'));
app.use('/groups', authToken, require('./routes/groups'));
app.use('/products', authToken, require('./routes/product'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
