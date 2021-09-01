import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const Loading = () => (
	<View style={tw`flex-auto justify-center items-center`}>
		<ActivityIndicator size="large" style={tw`m-8`} />
	</View>
);

export default Loading;
