import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import HeaderView from '../containers/HeaderView';
import Logo from '../assets/logo.svg';
import ThemeSwitcher from '../components/ThemeSwitcher';
import { IconLabelButton, LabelButton } from '../components/Buttons';
import { useStoreState } from '../hooks/storeTypedHooks';
import tw from 'tailwind-react-native-classnames';
import useLogin from '../hooks/useLogin';

const SignInScreen = () => {
	const { dark } = useStoreState(state => state.theme);
	const loginWith = useLogin();
	const theme = useTheme();

	return (
		<>
			<HeaderView style={tw`flex-row justify-between`}>
				<View></View>
				<Logo style={{ marginVertical: 50 }} width={128} height={128} />
				<ThemeSwitcher style={styles.themeSwitcherIcon} />
			</HeaderView>
			<View style={{ padding: 15, alignItems: 'center' }}>
				<IconLabelButton
					label="With Google"
					theme={theme}
					icon="google"
					onPress={() => loginWith('google')}
				/>
				<IconLabelButton
					label="With Facebook"
					theme={theme}
					icon="facebook"
					onPress={() => loginWith('facebook')}
				/>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	themeSwitcherIcon: {
		position: 'absolute',
		top: 0,
		right: 0,
	},
});

export default SignInScreen;
