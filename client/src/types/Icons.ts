import { ViewStyle } from 'react-native';

export type Icons =
	| 'arrow'
	| 'crossed'
	| 'plus'
	| 'pipe'
	| 'logout'
	| 'facebook'
	| 'google';

export default interface IconProps {
	icon: Icons;
	style?: ViewStyle;
}
