import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
	const navigation = useNavigation();

	return (
		<View>
			<Text style={{ textAlign: 'center', padding: 25 }}>
				Profile content
			</Text>
			<Button title="Home" onPress={() => navigation.navigate('Home')} />
		</View>
	);
};

export default ProfileScreen;
