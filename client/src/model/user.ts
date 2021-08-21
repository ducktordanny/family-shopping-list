import { Action, action } from 'easy-peasy';

type TokenValueType = string | undefined;
type IsLoggedValueType = boolean;

interface UserValueModel {
	id: string | undefined;
	clientId: string | undefined;
	name: string | undefined;
	email: string | undefined;
	picture: string | undefined;
}

interface TokenValueModel {
	token: TokenValueType;
}

interface IsLoggedValueModel {
	isLogged: IsLoggedValueType;
}

export interface UserModel
	extends UserValueModel,
		TokenValueModel,
		IsLoggedValueModel {
	setUser: Action<UserModel, UserValueModel>;
	setToken: Action<UserModel, TokenValueType>;
	setIsLogged: Action<UserModel, IsLoggedValueType>;
}

const userModel: UserModel = {
	id: undefined,
	clientId: undefined,
	name: undefined,
	email: undefined,
	picture: undefined,
	token: undefined,
	isLogged: false,
	setUser: action((state, payload) => {
		state = { ...state, ...payload };
	}),
	setToken: action((state, payload) => {
		state.token = payload;
	}),
	setIsLogged: action((state, payload) => {
		state.isLogged = payload;
	}),
};

export default userModel;
