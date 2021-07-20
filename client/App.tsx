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
	KeyboardAvoidingView,
	TextInput,
} from 'react-native';
import axios from 'axios';

// LinkingIOS: https://stackoverflow.com/questions/64522909/universal-linking-ios-where-is-the-xcodeproj-file
const API = 'http://localhost:3000';

interface groupContainerProps {
	_id?: string;
	userIds?: string[];
	name: string;
	createdBy: string;
	createdAt: Date;
	token: string;
}

const GroupContainer = ({
	_id,
	userIds,
	name,
	createdBy,
	createdAt,
	token,
}: groupContainerProps) => {
	const [nameOfUserWhoCreatedTheGroup, setNameOfUserWhoCreatedTheGroup] =
		useState<string>('');
	const [participants, setParticipants] = useState<string[]>([]);
	useEffect(() => {
		const getUserName = async () => {
			const response = await axios.get(`${API}/users/${createdBy}`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			});
			setNameOfUserWhoCreatedTheGroup(response.data.name);
		};
		const getParticipants = async () => {
			const response = await axios.get(`${API}/users`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			});
		};
		getUserName();
	}, []);

	return (
		<View style={styles.groupContainer}>
			<Text>{name}</Text>
			<Text>Created by: {nameOfUserWhoCreatedTheGroup}</Text>
			<Text>Participants: {participants}</Text>
			<Text>{new Date(createdAt).toLocaleString()}</Text>
		</View>
	);
};

// JUST FOR TESTING (will be rewritter)
export default function App() {
	const [user, setUser] = useState<{
		_id: string;
		token: string;
		clientId: string;
		name: string;
		email: string;
		picture: string;
		provider: 'google' | 'facebook';
		createdAt: Date;
	} | null>(null);
	const [groups, setGroups] = useState<
		Array<{
			_id: string;
			userIds: string[];
			name: string;
			createdBy: string;
			createdAt: Date;
		}>
	>([]);
	const [newGroup, setNewGroup] = useState<string>('');

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
				.catch((error) => console.error(error.message));
		} else {
			Linking.openURL(url);
		}
	};

	const getGroups = async () => {
		if (user !== null) {
			try {
				const response = await axios.get(
					`http://localhost:3000/groups/${user._id}`,
					{
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${user.token}`,
						},
					}
				);
				setGroups(response.data);
			} catch (err) {
				console.error(err);
			}
		} else {
			console.warn('User not found.');
		}
	};

	const createGroup = async () => {
		if (user !== null) {
			try {
				if (newGroup === undefined)
					throw new Error('Group name undefined.');
				const response = await axios.post(
					'http://localhost:3000/groups/create',
					{
						name: `${newGroup}`,
					},
					{
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${user.token}`,
						},
					}
				);
				setNewGroup('');
				setGroups((current) => [...current, response.data]);
			} catch (err) {
				console.error(err.message);
			}
		}
	};

	useEffect(() => {
		if (user) {
			console.log(user.token);
			getGroups();
		}
	}, [user]);

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
								onPress={() => {
									setUser(null);
									setGroups([]);
								}}
							/>
						</View>
					</View>
					<View style={styles.buttonContainer}>
						<Button title="Refresh" onPress={getGroups} />
					</View>
					<KeyboardAvoidingView>
						<TextInput
							placeholder="New group name"
							value={newGroup}
							onChangeText={(text) => setNewGroup(text)}
							onSubmitEditing={createGroup}
						/>
						<Button title="Create" onPress={createGroup} />
					</KeyboardAvoidingView>
					<ScrollView
						style={{
							paddingHorizontal: 10,
							width: '100%',
							borderRadius: 30,
						}}
					>
						{groups.length !== 0 ? (
							groups.map((element, index) => (
								<GroupContainer
									key={index}
									{...element}
									token={user.token}
								/>
							))
						) : (
							<Text style={{ textAlign: 'center' }}>
								There are no groups.
							</Text>
						)}
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
	groupContainer: {
		width: '100%',
		padding: 10,
		marginVertical: 5,
		backgroundColor: '#eee',
		borderRadius: 15,
	},
});
