const User = require('../models/User');

const getUserById = async (id) => {
	const user = await User.findOne({ _id: id }, ['_id', 'name', 'picture']);
	return user;
};

const getUsersForProduct = async (prod) => {
	const addedByUser = await getUserById(prod.addedBy);
	const boughtByUser = await getUserById(prod.boughtBy);

	return {
		...prod._doc,
		addedBy: addedByUser,
		boughtBy: boughtByUser,
	};
};

module.exports = {
	getUserById,
	getUsersForProduct,
};
