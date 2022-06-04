import React, {ReactNode} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {default as globColors} from '../theme/colors';

export interface HeaderViewProps {
  children: ReactNode;
  colors?: string[];
  style?: StyleProp<ViewStyle>;
}

const HeaderView = ({children, colors, style}: HeaderViewProps) => (
  <LinearGradient
    colors={colors || globColors.header}
    style={styles.mainContainer}
    shouldRasterizeIOS>
    <SafeAreaView>
      <View style={[styles.contentContainer, style]}>{children}</View>
    </SafeAreaView>
  </LinearGradient>
);

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
