import React from 'react';
import { TextStyle, Text, StyleSheet } from 'react-native';
import { Theme, useTheme } from '@react-navigation/native';

interface TextProps {
	children?: React.ReactNode;
	style?: TextStyle;
}

export const Title = ({ children, style }: TextProps) => {
	const theme = useTheme();

	return (
		<Text style={[styles.title, { color: theme.colors.text }, style]}>
			{children}
		</Text>
	);
};

export const SubTitle = ({ children, style }: TextProps) => {
	const theme = useTheme();

	return (
		<Text style={[styles.subTitle, { color: theme.colors.text }, style]}>
			{children}
		</Text>
	);
};

export const Label = ({ children, style }: TextProps) => {
	const theme = useTheme();

	return (
		<Text style={[styles.label, { color: theme.colors.text }, style]}>
			{children}
		</Text>
	);
};

const styles = StyleSheet.create({
	title: {
		marginTop: 20,
		fontSize: 24,
		fontWeight: 'bold',
	},
	subTitle: {
		marginTop: 20,
		fontSize: 18,
		fontWeight: 'bold',
	},
	label: {
		marginTop: 5,
		fontSize: 14,
	},
});
