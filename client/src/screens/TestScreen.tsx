import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import HeaderView from '../containers/HeaderView';
import LabeledLogo from '../assets/labeled-logo.svg';
import ThemeSwitcher from '../components/ThemeSwitcher';
import { IconLabelButton, OnlyLabelButton } from '../components/Buttons';

const TestScreen = () => {
	const theme = useTheme();

	const sayHi = () => console.log('Hi :)');

	return (
		<>
			<HeaderView
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
				}}>
				<View></View>
				<LabeledLogo style={{ marginVertical: 50 }} width={123} height={128} />
				<ThemeSwitcher style={styles.themeSwitcherIcon} />
			</HeaderView>
			<View style={{ padding: 15, alignItems: 'center' }}>
				<OnlyLabelButton label="Login" theme={theme} />
				<IconLabelButton
					label="Test"
					theme={theme}
					icon="arrow"
					onPress={() => sayHi()}
				/>
				<IconLabelButton
					label="Test"
					theme={theme}
					icon="pipe"
					onPress={() => sayHi()}
				/>
				<IconLabelButton
					label="Test"
					theme={theme}
					icon="crossed"
					onPress={() => sayHi()}
				/>
				<IconLabelButton
					label="Test"
					theme={theme}
					icon="plus"
					onPress={() => sayHi()}
				/>
				<IconLabelButton
					label="Test"
					theme={theme}
					icon="google"
					onPress={() => sayHi()}
				/>
				<IconLabelButton
					label="Test"
					theme={theme}
					icon="facebook"
					onPress={() => sayHi()}
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

export default TestScreen;
