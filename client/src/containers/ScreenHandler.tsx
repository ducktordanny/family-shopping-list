import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DarkTheme, LightTheme } from '../theme';

import Loading from '../components/Loading';
import useToken from '../hooks/useToken';
import { useStoreState } from '../hooks/storeTypedHooks';

import SignInScreen from '../screens/SignInScreen';
import ProfileScreen from '../screens/ProfileScreen';
import GroupScreen from '../screens/GroupScreen';
import { RootStackParamList } from '../types/NavigationProps';

const Stack = createStackNavigator<RootStackParamList>();

const ScreenHandler = () => {
	const { isLogged } = useStoreState(state => state.user);
	const { dark } = useStoreState(state => state.theme);

	useToken();

	// TODO: Fix the navigate type definition when using useNavigation (docs)

	return (
		<NavigationContainer theme={dark ? DarkTheme : LightTheme}>
			<Stack.Navigator initialRouteName={isLogged ? 'Profile' : 'SignIn'}>
				{isLogged ? (
					<>
						<Stack.Screen
							name="Profile"
							component={ProfileScreen}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="Group"
							component={GroupScreen}
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
