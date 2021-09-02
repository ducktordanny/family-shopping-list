const Group = require('../models/Group');
const { getUserById } = require('./users');

/**
 * Returns a group with users
 * @param {string} id 
 */
const getGroupById = async (id) => {
	const group = await Group.findById(id, ['_id', 'userIds', 'createdBy', 'name', 'createdAt']);
	console.log('users', group.userIds);
	const members = await group.userIds.map(getUserById);
	const createdBy = await getUserById(group.createdBy);

	const response = { ...group._doc, createdBy };
	response.members = await Promise.all(members);
	delete response.userIds;

	return response;
};

module.exports = {
	getGroupById,
};
