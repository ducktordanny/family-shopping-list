export const login = (token: string) => {
	return {
		type: 'LOGIN',
		payload: token,
	};
};

export const logout = () => {
	return {
		type: 'LOGOUT',
	};
};
