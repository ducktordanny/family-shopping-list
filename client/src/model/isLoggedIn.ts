import { Action, action } from 'easy-peasy';

export interface IsLoggedInModel {
	value: boolean;
	setValue: Action<IsLoggedInModel, boolean>;
}

const isLoggedInModel: IsLoggedInModel = {
	value: false,
	setValue: action((state, payload) => {
		// change value on userAction what means on login or logout:
		state.value = payload;
	}),
};

export default isLoggedInModel;
