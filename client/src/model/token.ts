import { Action, action } from 'easy-peasy';

export interface TokenModel {
	value: string | undefined;
	setValue: Action<TokenModel, string | undefined>;
}

const tokenModel: TokenModel = {
	value: undefined,
	setValue: action((state, payload) => {
		state.value = payload;
	}),
};

export default tokenModel;
