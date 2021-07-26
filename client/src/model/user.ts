import { Action, action } from 'easy-peasy';

export interface UserValueInterface {
	id: string | undefined;
	clientId: string | undefined;
	name: string | undefined;
	email: string | undefined;
	picture: string | undefined;
}

export interface UserModel {
	value: UserValueInterface;
	setValue: Action<UserModel, UserValueInterface>;
}

const userModel: UserModel = {
	value: {
		id: undefined,
		clientId: undefined,
		name: undefined,
		email: undefined,
		picture: undefined,
	},
	setValue: action((state, payload) => {
		state.value = payload;
	}),
};

export default userModel;
