import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
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

const styles = StyleSheet.create({
	container: {
		width: '100%',
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		padding: 10,
	},
	title: {
		fontSize: 28,
		fontWeight: 'bold',
	},
});

export default App;
