import axios from 'axios';

import GroupProps from '../types/GroupProps';
import API from './';

const useCreateGroup = (token: string | undefined) => {
	const createGroup = async (
		groupName: string
	): Promise<GroupProps | undefined> => {
		try {
			if (token === undefined) throw new Error('User not logged in.');
			const response = await axios.post(
				`${API}/groups/create`,
				{
					name: groupName,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				}
			);
			const {
				_id: id,
				userIds,
				createdBy,
				name,
				createdAt,
			} = response.data;
			return {
				id,
				userIds,
				createdBy,
				name,
				createdAt,
			};
		} catch (err) {
			console.error(err);
			return undefined;
		}
	};

	return createGroup;
};

export default useCreateGroup;
