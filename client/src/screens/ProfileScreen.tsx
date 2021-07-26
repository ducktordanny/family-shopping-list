import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useStoreState } from '../hooks/storeTypedHooks';
import useLogout from '../hooks/useLogout';

const ProfileScreen = () => {
	const navigation = useNavigation();
	const user = useStoreState((state) => state.user.value);
	const logout = useLogout();

	console.log(user);

	return (
		<View>
			<Text style={{ textAlign: 'center', paddingTop: 25 }}>
				Profile content:
			</Text>
			<Text style={{ textAlign: 'center', paddingTop: 25 }}>
				{user.name}
			</Text>
			<Text style={{ textAlign: 'center', padding: 25 }}>
				{user.email}
			</Text>
			<Button title="Home" onPress={() => navigation.navigate('Home')} />
			<Button title="Logout" onPress={() => logout()} />
		</View>
	);
};

export default ProfileScreen;
