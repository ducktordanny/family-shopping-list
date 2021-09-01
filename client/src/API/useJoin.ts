import axios from 'axios';
import API, { getHeaders } from '.';

const useJoin = (token: string | undefined) => {
	const joinTo = async (groupId: string | undefined) => {
		try {
			if (token === undefined) throw new Error('User not logged in.');
			if (groupId === undefined) throw new Error('Invalid group ID.');
			const response = await axios.patch(
				`${API}/groups/join/${groupId}`,
				undefined,
				getHeaders(token),
			);

			return response.data;
		} catch (err) {
			if (err.response?.data) {
				console.error(err.response.data);
			}
			console.log('Joining Error:', err.message);
			return undefined;
		}
	};

	return joinTo;
};

export default useJoin;
