import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import useToken from '../hooks/useToken';
import { useStoreState } from '../hooks/storeTypedHooks';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import GroupsScreen from '../screens/GroupsScreen';
import GroupDetailsScreen from '../screens/GroupDetailsScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';

const Stack = createStackNavigator();

const ScreenHandler = () => {
	useToken();
	const userName = useStoreState((state) => state.user.value.name);
	const chosenGroup = useStoreState((state) => state.chosenGroup.name);
	const isLoggedIn = useStoreState((state) => state.isLoggedIn.value);

	/**
	 * while verifying the token we should show a Loading screen
	 * and if it fails then load LoginScreen otherwise ProfileScreen
	 */

	return (
		<Stack.Navigator initialRouteName={isLoggedIn ? 'Profile' : 'Login'}>
			{isLoggedIn ? (
				<>
					<Stack.Screen name="Profile" component={ProfileScreen} />
					<Stack.Screen
						name="Groups"
						component={GroupsScreen}
						options={{ headerTitle: `${userName}'s groups` }}
					/>
					<Stack.Screen
						name="Group details"
						component={GroupDetailsScreen}
						options={{
							headerTitle: chosenGroup || 'Group details',
						}}
					/>
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
	);
};

export default ScreenHandler;
