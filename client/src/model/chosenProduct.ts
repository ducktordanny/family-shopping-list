import { Action, action } from 'easy-peasy';

export interface ChosenProductModel {
	id: string | null;
	setValue: Action<ChosenProductModel, { id: string; content: string }>;
}

const chosenProductModel: ChosenProductModel = {
	id: null,
	setValue: action((state, payload) => {
		state.id = payload.id;
	}),
};

export default chosenProductModel;
