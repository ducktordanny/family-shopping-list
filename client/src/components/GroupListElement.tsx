import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useStoreActions } from '../hooks/storeTypedHooks';
import tw from 'tailwind-react-native-classnames';

interface GroupListElementProps {
	id: string;
	name: string;
	createdAt: Date;
}

const GroupListElement = ({ id, name, createdAt }: GroupListElementProps) => {
	const setChosenGroup = useStoreActions(
		(state) => state.chosenGroup.setValue
	);
	const navigation = useNavigation();

	return (
		<View
			style={tw`mt-4 mx-4 p-4 rounded-xl bg-white flex-row justify-between`}
		>
			<View>
				<Text style={tw`text-base font-semibold`}>{name}</Text>
				<Text>{new Date(createdAt).toLocaleString()}</Text>
			</View>
			<Button
				title="View"
				onPress={() => {
					setChosenGroup({ id, name });
					navigation.navigate('Group details');
				}}
			/>
		</View>
	);
};

export default GroupListElement;
