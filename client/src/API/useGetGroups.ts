import { useState, useEffect } from 'react';
import axios from 'axios';

import API, { getHeaders } from './';
import GroupProps from '../types/GroupProps';

const useGetGroups = (
	userId: string | undefined,
	token: string | undefined,
) => {
	const [groups, setGroups] = useState<GroupProps[] | null>(null);

	useEffect(() => {
		const getGroups = async () => {
			try {
				if (userId === undefined || token === undefined)
					throw new Error('User not logged in.');

				const response = await axios.get(
					`${API}/groups/${userId}`,
					getHeaders(token),
				);

				if (response.data.length === 0) setGroups([]);
				else {
					response.data.forEach((element: any) => {
						const group: GroupProps = element;

						setGroups(current =>
							current !== null ? [group, ...current] : [group],
						);
					});
				}
			} catch (err) {
				console.log(err);
			}
		};
		setGroups(null);
		getGroups();
	}, [userId, token]);

	const addGroup = (newGroup: GroupProps) => {
		setGroups(current =>
			current !== null ? [newGroup, ...current] : [newGroup],
		);
	};

	return [groups, addGroup] as const;
};

export default useGetGroups;
