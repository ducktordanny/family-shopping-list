import React from 'react';
import {
	View,
	SafeAreaView,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
} from 'react-native';
import { useRoute } from '@react-navigation/core';
import HeaderView from '../containers/HeaderView';
import GoBackIcon from '../components/GoBackIcon';
import { RootStackParamList } from '../types/NavigationProps';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Label, SubTitle, Title } from '../components/Texts';
import MiniUserCard from '../components/MiniUserCard';
import TextField from '../components/TextField';
import globStyles from '../styles';
import tw from 'tailwind-react-native-classnames';

type Props = NativeStackScreenProps<RootStackParamList, 'Product'>;
type ProductScreenRouteProp = Props['route'];

const ProductScreen = () => {
	const { groupName, product } = useRoute<ProductScreenRouteProp>().params;

	return (
		<>
			<HeaderView>
				<View style={tw`flex-row items-center justify-between`}>
					<GoBackIcon />
					<Title style={tw`m-0`}>{groupName}</Title>
					<View style={{ width: 20 }}></View>
				</View>
				<View style={tw`items-center`}>
					<SubTitle style={{ marginTop: 10 }}>{product.content}</SubTitle>
				</View>
			</HeaderView>
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				style={{ flex: 1 }}>
				<SafeAreaView style={tw`justify-between`}>
					<ScrollView style={[globStyles.card, { marginBottom: 0 }]}>
						<View style={tw`items-center`}>
							<SubTitle style={tw`m-0`}>Added</SubTitle>
							<MiniUserCard
								name={product.addedBy.name}
								picture={product.addedBy.picture}
							/>
							<Label style={tw`m-0`}>
								{new Date(product.createdAt || '').toDateString()}
							</Label>
							{product.boughtAt !== null && product.boughtBy && (
								<>
									<SubTitle>Bought</SubTitle>
									<MiniUserCard
										name={product.boughtBy.name}
										picture={product.boughtBy.picture}
									/>
									<Label style={tw`m-0`}>
										{new Date(product.boughtAt || '').toDateString()}
									</Label>
								</>
							)}
						</View>
						<SubTitle style={tw`m-0`}>Edit</SubTitle>
						<Label>
							Hello World this is something what doesn't mean anything...
						</Label>
						<TextField placeholder="Test" />
						<TextField placeholder="Test" />
						<View style={{ height: 60 }}></View>
					</ScrollView>
				</SafeAreaView>
			</KeyboardAvoidingView>
		</>
	);
};

export default ProductScreen;
