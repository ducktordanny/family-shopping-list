import {DefaultTheme} from '@react-navigation/native';
import colors from './colors';

// export declare type Theme = {
// 	dark: boolean;
// 	colors: {
// 			primary: string;
// 			background: string;
// 			card: string;
// 			text: string;
// 			border: string;
// 			notification: string;
// 	};
// };

export const LightTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    ...colors.light,
  },
};

export const DarkTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    ...colors.dark,
  },
};
