import {Action, action} from 'easy-peasy';

export interface ThemeModel {
  dark: boolean;
  setDark: Action<ThemeModel, boolean>;
}

const themeModel: ThemeModel = {
  /** Should be calculated at the begining. */
  dark: false,
  setDark: action((state, payload) => {
    state.dark = payload;
  }),
};

export default themeModel;
