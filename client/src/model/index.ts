import isLoggedInModel, { IsLoggedInModel } from './isLoggedIn';
import userModel, { UserModel } from './user';
import tokenModel, { TokenModel } from './token';

export interface StoreModel {
	isLoggedIn: IsLoggedInModel;
	user: UserModel;
	token: TokenModel;
}

const storeModel: StoreModel = {
	isLoggedIn: isLoggedInModel,
	user: userModel,
	token: tokenModel,
};

export default storeModel;
