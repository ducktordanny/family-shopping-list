import React from 'react';
import {
	View,
	Button,
	NativeSyntheticEvent,
	NativeTouchEvent,
	StyleProp,
	ViewStyle,
} from 'react-native';

interface StyledButtonProps {
	title: string;
	onPress: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
	style?: StyleProp<ViewStyle>;
}

const StyledButton = ({ title, onPress, style }: StyledButtonProps) => {
	return (
		<View style={style}>
			<Button title={title} onPress={onPress} />
		</View>
	);
};

export default StyledButton;
