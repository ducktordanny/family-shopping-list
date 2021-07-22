import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';

import { loginScreenProps } from '../types/screenProps';

const LoginScreen = ({ token, login }: loginScreenProps) => {
	return (
		<>
			<View style={styles.loginContainer}>
				<View></View>
				<Text>Login for displaying your informations</Text>
				<View style={styles.buttonGroup}>
					<View style={styles.buttonContainer}>
						<Button
							title="Login with Google"
							onPress={() => login('google')}
						/>
					</View>
					<View style={styles.buttonContainer}>
						<Button
							title="Login with Facebook"
							onPress={() => login('facebook')}
						/>
					</View>
				</View>
			</View>
			<StatusBar style="auto" />
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
