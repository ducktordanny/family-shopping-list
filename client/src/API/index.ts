export const getHeaders = (token: string) => ({
	headers: {
		Authorization: `Bearer ${token}`,
		'Content-Type': 'application/json',
	},
});

const API: string = 'http://localhost:3000';

export default API;
