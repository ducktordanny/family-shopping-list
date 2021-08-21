import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Theme } from '@react-navigation/native';
import colors from '../theme/colors';
import { SvgUri } from 'react-native-svg';
import API from '../API';

interface ButtonProps {
	label: string;
	theme: Theme;
	onPress?: () => void;
}

export const OnlyLabelButton = ({ label, theme, onPress }: ButtonProps) => (
	<TouchableOpacity onPress={() => onPress && onPress()}>
		<View
			style={[styles.buttonContainer, { backgroundColor: theme.colors.card }]}>
			<Text style={styles.buttonLabel}>{label}</Text>
		</View>
	</TouchableOpacity>
);

interface IconProps extends ButtonProps {
	icon: 'arrow' | 'crossed' | 'plus' | 'pipe' | 'google' | 'facebook';
}

export const IconLabelButton = ({ label, theme, icon, onPress }: IconProps) => {
	return (
		<TouchableOpacity onPress={() => onPress && onPress()}>
			<View
				style={[
					styles.buttonContainer,
					{ backgroundColor: theme.colors.card },
				]}>
				<SvgUri uri={`${API}/assets/${icon}.svg`} width={15} height={15} />
				<Text style={[styles.buttonLabel, { paddingLeft: 5 }]}>{label}</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	buttonContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		margin: 5,
		paddingVertical: 10,
		paddingHorizontal: 15,
		borderRadius: 30,
	},
	buttonLabel: {
		fontSize: 17,
		color: colors.buttonLabel,
	},
});
