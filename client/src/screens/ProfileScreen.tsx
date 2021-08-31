import React from 'react';
import {
	SafeAreaView,
	TouchableOpacity,
	View,
	Image,
	Text,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
// import { useNavigation } from '@react-navigation/native';
import { useStoreState } from '../hooks/storeTypedHooks';

import styles from '../styles';
import useLogout from '../hooks/useLogout';
import HeaderView from '../containers/HeaderView';
import tw from 'tailwind-react-native-classnames';
import ThemeSwitcher from '../components/ThemeSwitcher';
import Icon from '../components/Icon';

const ProfileScreen = () => {
	// const navigation = useNavigation();
	const user = useStoreState(state => state.user);
	const logout = useLogout();
	const theme = useTheme();

	// TODO: make styled components for easier usage
	// TODO: make group card component

	return (
		<>
			<HeaderView style={tw`flex-row justify-between`}>
				<TouchableOpacity onPress={() => logout()}>
					<Icon style={tw`absolute top-0 left-0`} icon="logout" />
				</TouchableOpacity>
				<View style={tw`items-center`}>
					<Image
						style={[tw`rounded-full`, { width: 75, height: 75 }]}
						source={{
							uri: user.picture || 'https://i.imgur.com/Yrz6oBC.png',
						}}
					/>
					<Text
						style={[
							{
								marginTop: 20,
								fontSize: 24,
								fontWeight: 'bold',
								color: theme.colors.text,
							},
						]}>
						{user.name}
					</Text>
					<Text
						style={[{ marginTop: 5, fontSize: 14, color: theme.colors.text }]}>
						Logged in via {user.provider || '-'}
					</Text>
					<Text
						style={[{ marginTop: 5, fontSize: 14, color: theme.colors.text }]}>
						{user.email}
					</Text>
					<Text
						style={[
							{
								marginTop: 20,
								fontSize: 18,
								fontWeight: 'bold',
								color: theme.colors.text,
							},
						]}>
						Member since
					</Text>
					<Text
						style={[{ marginTop: 5, fontSize: 14, color: theme.colors.text }]}>
						{new Date(user.createdAt || '').toDateString()}
					</Text>
				</View>
				<ThemeSwitcher style={tw`absolute top-0 right-0`} />
			</HeaderView>
			<SafeAreaView style={styles.container}></SafeAreaView>
		</>
	);
};

export default ProfileScreen;
