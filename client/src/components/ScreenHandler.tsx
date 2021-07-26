import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import useToken from '../hooks/useToken';
import { useStoreState } from '../hooks/storeTypedHooks';
import ProfileScreen from '../screens/ProfileScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createStackNavigator();

const ScreenHandler = () => {
	useToken();
	const isLoggedIn = useStoreState((state) => state.isLoggedIn.value);

	/**
	 * while verifying the token we should show a Loading screen
	 * and if it fails then load LoginScreen otherwise ProfileScreen
	 */

	return (
		<Stack.Navigator>
			{isLoggedIn === true ? (
				<>
					<Stack.Screen name="Profile" component={ProfileScreen} />
					<Stack.Screen name="Home" component={HomeScreen} />
				</>
			) : (
				<Stack.Screen name="Login" component={LoginScreen} />
			)}
		</Stack.Navigator>
	);
};

export default ScreenHandler;
