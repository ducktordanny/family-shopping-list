const tokenReducer = (
	state: string | null = null,
	action: { type: string; payload: string }
) => {
	switch (action.type) {
		case 'LOGIN':
			return action.payload;
		case 'LOGOUT':
			return null;
		default:
			return new Error('[tokenReducer]: Invalid action type.');
	}
};

export default tokenReducer;
