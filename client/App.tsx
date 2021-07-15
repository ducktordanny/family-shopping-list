import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import SafariView from 'react-native-safari-view';
import {
	StyleSheet,
	Text,
	View,
	Button,
	Linking,
	Platform,
	Image,
	SafeAreaView,
	ScrollView,
} from 'react-native';

// LinkingIOS: https://stackoverflow.com/questions/64522909/universal-linking-ios-where-is-the-xcodeproj-file

interface todoContainerProps {
	text: string;
}

const TodoContainer = ({ text }: todoContainerProps) => (
	<View style={styles.todoContainer}>
		<Text>{text}</Text>
	</View>
);

const randomText = [
	'Hello heloo...',
	'Something asdasd',
	'Dogs or cats? both...',
	'banana',
	'asdasd asdasd asdasd',
	'Long is streaming right now...',
	'Hello hello this is meeee... Mario',
	'Random test...',
	'Another random test...',
	'Hello heloo...',
	'Something asdasd',
	'Dogs or cats? both...',
	'banana',
	'asdasd asdasd asdasd',
	'Long is streaming right now...',
	'Hello hello this is meeee... Mario',
	'Random test...',
	'Another random test...',
];

const API = 'http://localhost:3000';

export default function App() {
	const [user, setUser] = useState<{
		clientId: number;
		name: string;
		email: string;
		picture: string;
		provider: 'google' | 'facebook';
	} | null>(null);

	useEffect(() => {
		const handleOpenURL = ({ url }: { url: string }) => {
			try {
				const userString = url.match(/user=([^#]+)/);
				const userObject = JSON.parse(decodeURI(userString![1]));
				setUser(userObject);
			} catch (err) {
				console.error(
					`Something went wrong during login. Message: ${err.message}`
				);
			}

			if (Platform.OS === 'ios') {
				SafariView.dismiss();
			}
		};

		// Add event listener to handle OAuthLogin:// URLs
		Linking.addEventListener('url', handleOpenURL);
		// Launched from an external URL
		Linking.getInitialURL().then((url) => {
			if (url) {
				handleOpenURL({ url });
			}
		});

		return () => {
			Linking.removeEventListener('url', handleOpenURL);
		};
	}, []);

	const loginWithGoogle = () => openUrl(`${API}/auth/google`);

	const loginWithFacebook = () => openUrl(`${API}/auth/facebook`);

	const openUrl = (url: string) => {
		if (Platform.OS === 'ios') {
			SafariView.isAvailable()
				.then(() =>
					SafariView.show({
						url,
						fromBottom: true,
					})
				)
				.catch((error) => console.log(error.message));
		} else {
			Linking.openURL(url);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.header}>Secret Project Title</Text>
			{user === null ? (
				<View style={styles.loginContainer}>
					<View></View>
					<Text>Login for displaying your informations</Text>
					<View style={styles.buttonGroup}>
						<View style={styles.buttonContainer}>
							<Button
								title="Login with Google"
								onPress={loginWithGoogle}
							/>
						</View>
						<View style={styles.buttonContainer}>
							<Button
								title="Login with Facebook"
								onPress={loginWithFacebook}
							/>
						</View>
					</View>
				</View>
			) : (
				<>
					<View style={styles.profile}>
						<Image
							source={{ uri: user.picture }}
							style={styles.profilePic}
						/>
						<Text style={styles.profileName}>{user.name}</Text>
						<Text style={styles.profileEmail}>{user.email}</Text>
						<Text style={styles.profileEmail}>
							Logged in with {user.provider}.
						</Text>
						<View style={styles.buttonContainer}>
							<Button
								title="Log out"
								onPress={() => setUser(null)}
							/>
						</View>
					</View>
					<ScrollView
						style={{
							paddingHorizontal: 10,
							width: '100%',
							borderRadius: 30,
						}}
					>
						{randomText.map((element, index) => (
							<TodoContainer key={index} text={element} />
						))}
					</ScrollView>
				</>
			)}
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
	profile: {
		// flex: 1,
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	profilePic: {
		width: 100,
		height: 100,
		borderRadius: 50,
		borderWidth: 2,
		borderColor: '#000',
	},
	profileName: {
		paddingTop: 12,
		fontSize: 24,
		// fontWeight: 'bold',
	},
	profileEmail: {
		paddingTop: 9,
		fontSize: 18,
	},
	buttonContainer: {
		margin: 10,
	},
	buttonGroup: {
		display: 'flex',
		flexDirection: 'row',
	},
	todoContainer: {
		width: '100%',
		padding: 10,
		marginVertical: 5,
		backgroundColor: '#eee',
		borderRadius: 15,
	},
});
