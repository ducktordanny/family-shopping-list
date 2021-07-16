const mongoose = require('mongoose');
require('dotenv').config({ path: 'config/config.env' });

const URL = process.env.MONGO_CONNECTION;

const connectDB = async () => {
	try {
		mongoose.connect(URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false
		});
		console.log('Successfully connected to database.');
	} catch (err) {
		console.error(`Something went wrong: ${err.message}`);
		process.exit(1);
	}
};

module.exports = connectDB;
