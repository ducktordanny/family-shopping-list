const { MongoClient } = require('mongodb');
require('dotenv').config({ path: './config.env' });

const URL = process.env.MONGO_CONNECTION;
const client = new MongoClient(URL);

const connectDB = async () => {
	try {
		await client.connect();
		console.log('Successfully connected to database.');
	} catch (err) {
		console.error(err.message);
		process.exit(1);
	}
};

connectDB().catch(console.dir);
