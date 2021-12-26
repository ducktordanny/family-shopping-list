export const API_URL: string = __DEV__
	? 'http://localhost:3000'
	: 'https://shrouplist.herokuapp.com';

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
