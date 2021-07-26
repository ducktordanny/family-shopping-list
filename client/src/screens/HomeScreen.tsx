import React from 'react';
import { View, Text, Button } from 'react-native';

const HomeScreen = () => {
	return (
		<View>
			<Text style={{ textAlign: 'center', padding: 25 }}>
				Content Waouw
			</Text>
			<Button title="Hello Button" onPress={() => console.log('Hello')} />
		</View>
	);
};

export default HomeScreen;
