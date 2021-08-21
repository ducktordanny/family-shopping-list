import React from 'react';
import { useColorScheme } from 'react-native';
import { DarkTheme, LightTheme } from './src/theme';
import { NavigationContainer } from '@react-navigation/native';
import { StoreProvider } from 'easy-peasy';

import store from './src/store';
import ScreenHandler from './src/components/ScreenHandler';

const App = () => {
	const scheme = useColorScheme();

	// TODO: Should decide by store theme value what is gonna be calculated by the async-storage and os settings.
	return (
		<StoreProvider store={store}>
			<NavigationContainer theme={scheme === 'dark' ? DarkTheme : LightTheme}>
				<ScreenHandler />
			</NavigationContainer>
		</StoreProvider>
	);
};

export default App;
