import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import HeaderView from '../containers/HeaderView';
import Logo from '../assets/logo.svg';
import ThemeSwitcher from '../components/ThemeSwitcher';
import { IconLabelButton, LabelButton } from '../components/Buttons';
import { useStoreState } from '../hooks/storeTypedHooks';
import tw from 'tailwind-react-native-classnames';
import useLogin from '../hooks/useLogin';
import { Title } from '../components/Texts';
import globStyles from '../styles';

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
			<SafeAreaView
				style={[tw`justify-center items-center`, globStyles.container]}>
				<Title style={tw`absolute font-normal top-1`}>Sign in</Title>
				<IconLabelButton
					label="With Google"
					icon="google"
					onPress={() => loginWith('google')}
				/>
				<IconLabelButton
					label="With Facebook"
					icon="facebook"
					onPress={() => loginWith('facebook')}
				/>
			</SafeAreaView>
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
