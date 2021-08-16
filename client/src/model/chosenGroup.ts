import { Action, action } from 'easy-peasy';

export interface ChosenGroupModel {
	id: string | null;
	name: string | null;
	setValue: Action<ChosenGroupModel, { id: string; name: string }>;
}

const chosenGroupModel: ChosenGroupModel = {
	id: null,
	name: null,
	setValue: action((state, payload) => {
		state.id = payload.id;
		state.name = payload.name;
	}),
};

export default chosenGroupModel;
