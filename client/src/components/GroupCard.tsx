import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { SubTitle, Label } from './Texts';
import { LabelButton } from './Buttons';
import globStyles from '../styles';
import tw from 'tailwind-react-native-classnames';

export interface GroupCardProps {
	name: string;
	members: number;
	onPress?: () => void;
}

const GroupCard = ({ name, members, onPress }: GroupCardProps) => {
	const theme = useTheme();
	return (
		<View
			style={[
				tw`flex-row justify-between items-center`,
				globStyles.card,
				{ backgroundColor: theme.colors.card },
			]}>
			<View>
				<SubTitle style={tw`mt-0`}>{name}</SubTitle>
				<Label>{`${members} member(s)`}</Label>
			</View>
			<LabelButton label="View" style={tw`m-0 p-0`} onPress={onPress} />
		</View>
	);
};

export default GroupCard;
