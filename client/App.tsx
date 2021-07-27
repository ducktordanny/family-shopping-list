import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StoreProvider } from 'easy-peasy';

import store from './src/store';
import ScreenHandler from './src/components/ScreenHandler';

const App = () => {
	return (
		<StoreProvider store={store}>
			<NavigationContainer>
				<ScreenHandler />
			</NavigationContainer>
		</StoreProvider>
	);
};

export default App;
