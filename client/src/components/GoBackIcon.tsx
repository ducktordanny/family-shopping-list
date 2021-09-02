import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Arrow from '../assets/arrow.svg';

const GoBackIcon = () => {
	const navigation = useNavigation();

	return (
		<TouchableOpacity onPress={() => navigation.goBack()}>
			<Arrow width={20} height={20} />
		</TouchableOpacity>
	);
};

export default GoBackIcon;
