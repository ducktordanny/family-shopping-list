import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface GroupListElementProps {
	name: string;
	createdAt: Date;
}

const GroupListElement = ({ name, createdAt }: GroupListElementProps) => {
	const navigation = useNavigation();

	return (
		<View
			style={{
				marginTop: 15,
				marginHorizontal: 15,
				padding: 15,
				borderRadius: 15,
				backgroundColor: 'white',
				flexDirection: 'row',
				justifyContent: 'space-between',
			}}
		>
			<View>
				<Text style={{ fontSize: 16, fontWeight: 'bold' }}>{name}</Text>
				<Text>{new Date(createdAt).toLocaleString()}</Text>
			</View>
			<Button
				title="View"
				onPress={() => navigation.navigate('Group details')}
			/>
		</View>
	);
};

export default GroupListElement;
