import React from 'react';
import { StatusBar } from 'react-native';
import { DarkTheme, LightTheme } from '../theme';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import useToken from '../hooks/useToken';
import { useStoreState } from '../hooks/storeTypedHooks';
import SignInScreen from '../screens/SignInScreen';
import ProfileScreen from '../screens/ProfileScreen';
import GroupsScreen from '../screens/GroupsScreen';
import Loading from './Loading';

type RootStackParamList = {
	SignIn: undefined;
	Profile: undefined;
	Groups: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const ScreenHandler = () => {
	const { isLogged } = useStoreState(state => state.user);
	const { dark } = useStoreState(state => state.theme);

	useToken();

	// TODO: Fix the navigate type definition when using useNavigation (docs)

	return (
		<NavigationContainer theme={dark ? DarkTheme : LightTheme}>
			<Stack.Navigator initialRouteName={isLogged ? 'SignIn' : 'Profile'}>
				{isLogged ? (
					<>
						<Stack.Screen
							name="Profile"
							component={ProfileScreen}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="Groups"
							component={GroupsScreen}
							options={{ headerShown: false }}
						/>
					</>
				) : (
					<Stack.Screen
						name="SignIn"
						component={isLogged !== undefined ? SignInScreen : Loading}
						options={{ headerShown: false }}
					/>
				)}
			</Stack.Navigator>
			<StatusBar barStyle={`${dark ? 'light' : 'dark'}-content`} />
		</NavigationContainer>
	);
};

export default ScreenHandler;
