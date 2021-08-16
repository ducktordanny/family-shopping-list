import isLoggedInModel, { IsLoggedInModel } from './isLoggedIn';
import userModel, { UserModel } from './user';
import tokenModel, { TokenModel } from './token';
import chosenGroupModel, { ChosenGroupModel } from './chosenGroup';
import chosenProductModel, { ChosenProductModel } from './chosenProduct';

export interface StoreModel {
	isLoggedIn: IsLoggedInModel;
	user: UserModel;
	token: TokenModel;
	chosenGroup: ChosenGroupModel;
	chosenProduct: ChosenProductModel;
}

const storeModel: StoreModel = {
	isLoggedIn: isLoggedInModel,
	user: userModel,
	token: tokenModel,
	chosenGroup: chosenGroupModel,
	chosenProduct: chosenProductModel,
};

export default storeModel;
