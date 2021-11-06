import React, { ReactNode } from 'react';
import { SafeAreaView, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import globStyles from '../styles';
import HeaderView from './HeaderView';

export interface LayoutProps {
	header: ReactNode;
	body: ReactNode;
}

const Layout = ({ header, body }: LayoutProps) => (
	<>
		<HeaderView>{header}</HeaderView>
		<SafeAreaView style={[tw`justify-between`, globStyles.container]}>
			{body}
		</SafeAreaView>
	</>
);

export default Layout;
