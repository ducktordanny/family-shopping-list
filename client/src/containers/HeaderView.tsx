import React, { Component } from 'react';
import {
	SafeAreaView,
	View,
	StyleSheet,
	StyleProp,
	ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../theme/colors';

export interface HeaderViewProps {
	/** Colors of the gradient background. */
	colors?: string[];
	style?: StyleProp<ViewStyle>;
}

/**
 * Returns a styled View where you can set an array of colors to give its background
 * a linear gradient. If no colors are specified then it uses the default colors.
 * Tip: Use it at the top since it's a 'header'.
 */
class HeaderView extends Component<HeaderViewProps> {
	render() {
		return (
			<LinearGradient
				colors={this.props.colors || colors.header}
				style={styles.mainContainer}
				shouldRasterizeIOS>
				<SafeAreaView>
					<View style={[styles.contentContainer, this.props.style]}>
						{this.props.children}
					</View>
				</SafeAreaView>
			</LinearGradient>
		);
	}
}

const styles = StyleSheet.create({
	mainContainer: {
		width: '100%',
		minHeight: 44,
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
	},
	contentContainer: {
		padding: 20,
		opacity: 1,
	},
});

export default HeaderView;
