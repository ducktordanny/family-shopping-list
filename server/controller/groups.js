const Group = require('../models/Group');
const { getUserById } = require('./users');

/**
 * Get all members by a group id.
 * @param {string} id 
 */
const getMembersById = async (id) => {
	const { userIds: memberIds } = await Group.findById(id, ['userIds']);
	const members = await memberIds.map(getUserById);
	return Promise.all(members);
};

/**
 * Returns a group with users.
 * @param {string} id 
 */
const getGroupById = async (id) => {
	const group = await Group.findById(id, ['_id', 'createdBy', 'name', 'createdAt']);
	const createdBy = await getUserById(group.createdBy);
	const response = { ...group._doc, createdBy };

	return response;
};

module.exports = {
	getMembersById,
	getGroupById,
};
