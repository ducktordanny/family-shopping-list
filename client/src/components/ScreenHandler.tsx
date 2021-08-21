import React from 'react';
import { StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import useToken from '../hooks/useToken';
import { useStoreState } from '../hooks/storeTypedHooks';
// import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import GroupsScreen from '../screens/GroupsScreen';
import GroupDetailsScreen from '../screens/GroupDetailsScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import TestScreen from '../screens/TestScreen';

const Stack = createStackNavigator();

const ScreenHandler = () => {
	const { name: userName, isLogged } = useStoreState(state => state.user);
	const { dark } = useStoreState(state => state.theme);

	useToken();

	/**
	 * while verifying the token we should show a Loading screen
	 * and if it fails then load LoginScreen otherwise ProfileScreen
	 * TODO: for the most part it works, but at the begining it could be better
	 */

	return (
		<>
			<Stack.Navigator initialRouteName={isLogged ? 'Profile' : 'Login'}>
				{isLogged ? (
					<>
						<Stack.Screen
							name="Test"
							component={TestScreen}
							options={{ headerShown: false }}
						/>
						{/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
						<Stack.Screen
							name="Groups"
							component={GroupsScreen}
							options={{ headerTitle: `${userName}'s groups` }}
						/>
						<Stack.Screen name="Group details" component={GroupDetailsScreen} />
						<Stack.Screen
							name="Product details"
							component={ProductDetailsScreen}
							options={{
								headerShown: false,
							}}
						/>
					</>
				) : (
					<Stack.Screen name="Login" component={LoginScreen} />
				)}
			</Stack.Navigator>
			<StatusBar barStyle={`${dark ? 'dark' : 'light'}-content`} />
		</>
	);
};

export default ScreenHandler;
