import React from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import ToLightMode from '../assets/to-light-mode.svg';
import ToDarkMode from '../assets/to-dark-mode.svg';
import { useStoreActions, useStoreState } from '../hooks/storeTypedHooks';

export interface ThemeSwitcherProps {
	style?: ViewStyle;
}

const ThemeSwitcher = ({ style }: ThemeSwitcherProps) => {
	const { dark } = useStoreState(state => state.theme);
	const { setDark } = useStoreActions(state => state.theme);

	const handleThemeSwitch = () => {
		setDark(!dark);
		// TODO: implement theme mode changing
		console.log(`Should change theme to ${dark ? 'dark' : 'light'}.`);
	};

	return (
		<TouchableOpacity onPress={() => handleThemeSwitch()}>
			{dark ? (
				<ToLightMode style={style} width={20} height={20} />
			) : (
				<ToDarkMode style={style} width={20} height={20} />
			)}
		</TouchableOpacity>
	);
};

export default ThemeSwitcher;
