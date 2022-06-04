import userModel, {UserModel} from './user';
import themeModel, {ThemeModel} from './theme';

export interface StoreModel {
  user: UserModel;
  theme: ThemeModel;
}

const storeModel: StoreModel = {
  user: userModel,
  theme: themeModel,
};

export default storeModel;
