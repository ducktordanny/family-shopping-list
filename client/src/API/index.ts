export const API_URL: string = 'http://localhost:3000';

export const getHeaders = (token: string) => ({
	headers: {
		Authorization: `Bearer ${token}`,
		'Content-Type': 'application/json',
	},
});

const API = (path: string) => {
	return `${API_URL}${path}`;
};

export default API;
