import React from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';

import useLogin from '../hooks/useLogin';

const LoginScreen = () => {
	const loginWith = useLogin();

	return (
		<>
			<SafeAreaView style={styles.loginContainer}>
				<View></View>
				<Text>Login for displaying your informations</Text>
				<View style={styles.buttonGroup}>
					<View style={styles.buttonContainer}>
						<Button
							title="Login with Google"
							onPress={() => loginWith('google')}
						/>
					</View>
					<View style={styles.buttonContainer}>
						<Button
							title="Login with Facebook"
							onPress={() => loginWith('facebook')}
						/>
					</View>
				</View>
			</SafeAreaView>
		</>
	);
};

const styles = StyleSheet.create({
	loginContainer: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	buttonContainer: {
		margin: 10,
	},
	buttonGroup: {
		display: 'flex',
		flexDirection: 'row',
	},
});

export default LoginScreen;
