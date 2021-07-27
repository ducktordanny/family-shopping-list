import { useState, useEffect } from 'react';
import axios from 'axios';

import API from './';
import GroupProps from '../types/GroupProps';

const useGetGroups = (id: string | undefined, token: string | undefined) => {
	const [groups, setGroups] = useState<GroupProps[] | null>(null);

	const getGroups = async () => {
		try {
			if (id === undefined || token === undefined)
				throw new Error('User not logged in.');
			setGroups(null);
			const response = await axios.get(`${API}/groups/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
			});
			response.data.forEach((element: any) => {
				const {
					_id: id,
					userIds,
					createdBy,
					name,
					createdAt,
				} = element;
				const newGroup = { id, userIds, createdBy, name, createdAt };

				setGroups((current) =>
					current !== null ? [newGroup, ...current] : [newGroup]
				);
			});
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getGroups();
	}, []);

	const addGroup = (newGroup: GroupProps) => {
		setGroups((current) =>
			current !== null ? [newGroup, ...current] : [newGroup]
		);
	};

	return [groups, addGroup] as const;
};

export default useGetGroups;
