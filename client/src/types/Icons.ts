import { ViewStyle } from 'react-native';

export type Icons =
	| 'arrow'
	| 'crossed'
	| 'plus'
	| 'pipe'
	| 'logout'
	| 'menu'
	| 'facebook'
	| 'google';

export default interface IconProps {
	icon: Icons;
	height?: number;
	width?: number;
	style?: ViewStyle;
}
