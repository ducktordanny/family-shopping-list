import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';

import useLogin from './src/hooks/useLogin';

export default function App() {
	const [token, user, login, logout] = useLogin();

	useEffect(() => {
		console.log(token);
		console.log(user);
	}, [token, user]);

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.header}>Secret Project Title</Text>
			<View style={styles.loginContainer}>
				<View></View>
				<Text>Login for displaying your informations</Text>
				<View style={styles.buttonContainer}>
					<Button title="Logout" onPress={() => logout()} />
				</View>
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
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		padding: 10,
	},
	header: {
		padding: 10,
		fontSize: 28,
	},
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
