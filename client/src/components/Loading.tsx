import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const Loading = () => (
	<View style={tw`h-full justify-center items-center`}>
		<ActivityIndicator size="large" />
	</View>
);

export default Loading;
