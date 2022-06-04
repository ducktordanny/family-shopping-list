import React, {ReactNode} from 'react';
import {SafeAreaView, StyleProp, ViewStyle} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import globStyles from '../styles';
import HeaderView from './HeaderView';

export interface LayoutProps {
  header: ReactNode;
  body: ReactNode;
  headerStyle?: StyleProp<ViewStyle>;
  bodyStyle?: StyleProp<ViewStyle>;
}

const Layout = ({header, body, headerStyle, bodyStyle}: LayoutProps) => (
  <>
    <HeaderView style={headerStyle}>{header}</HeaderView>
    <SafeAreaView
      style={[tw`justify-between`, globStyles.container, bodyStyle]}>
      {body}
    </SafeAreaView>
  </>
);

export default Layout;
