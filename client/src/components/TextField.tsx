import React from 'react';
import { TextInput, TextInputProps, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Label } from './Texts';

export interface TextFieldProps extends TextInputProps {
	upperLabel?: string;
}

const TextField = (props: TextFieldProps) => {
	const theme = useTheme();

	return (
		<>
			{props.upperLabel !== undefined && (
				<Label style={{ margin: 0, paddingHorizontal: 10, paddingBottom: 5 }}>
					{props.upperLabel}
				</Label>
			)}
			<TextInput
				style={[styles.textfield, { borderColor: theme.colors.border }]}
				{...props}
			/>
		</>
	);
};

export default TextField;

const styles = StyleSheet.create({
	textfield: {
		padding: 10,
		borderWidth: 1,
		borderRadius: 5,
	},
});
