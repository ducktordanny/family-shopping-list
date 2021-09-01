import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { SubTitle, Label } from './Texts';
import { LabelButton } from './Buttons';
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
				tw`flex-row justify-between items-center rounded-xl`,
				styles.container,
				{ backgroundColor: theme.colors.card },
			]}>
			<View>
				<SubTitle theme={theme} style={tw`mt-0`}>
					{name}
				</SubTitle>
				<Label theme={theme}>{`${members} member(s)`}</Label>
			</View>
			<LabelButton label="View" style={tw`m-0 p-0`} onPress={onPress} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginBottom: 15,
		paddingHorizontal: 20,
		paddingVertical: 15,
	},
});

export default GroupCard;
