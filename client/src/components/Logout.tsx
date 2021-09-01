import React from 'react';
import { TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import useLogout from '../hooks/useLogout';
import Icon from './Icon';

const Logout = () => {
	const logout = useLogout();

	return (
		<TouchableOpacity onPress={() => logout()}>
			<Icon style={tw`absolute top-0 left-0`} icon="logout" />
		</TouchableOpacity>
	);
};

export default Logout;
