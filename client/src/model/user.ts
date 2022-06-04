import {Action, action} from 'easy-peasy';

type TokenValueType = string | undefined;
type IsLoggedValueType = boolean | undefined;

interface UserValueModel {
  id: string | undefined;
  clientId: string | undefined;
  name: string | undefined;
  email: string | undefined;
  picture: string | undefined;
  provider: 'google' | 'facebook' | undefined;
  createdAt: string | undefined;
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
  provider: undefined,
  createdAt: undefined,
  token: undefined,
  isLogged: undefined,
  setUser: action((state, payload) => {
    state.id = payload.id;
    state.clientId = payload.clientId;
    state.name = payload.name;
    state.email = payload.email;
    state.picture = payload.picture;
    state.provider = payload.provider;
    state.createdAt = payload.createdAt;
  }),
  setToken: action((state, payload) => {
    state.token = payload;
  }),
  setIsLogged: action((state, payload) => {
    state.isLogged = payload;
  }),
};

export default userModel;
