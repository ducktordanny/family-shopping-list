import React, { useEffect } from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/core';
import HeaderView from '../containers/HeaderView';
import GoBackIcon from '../components/GoBackIcon';
import { RootStackParamList } from '../types/NavigationProps';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import tw from 'tailwind-react-native-classnames';
import globStyles from '../styles';
import { Label, SubTitle, Title } from '../components/Texts';
import MiniUserCard from '../components/MiniUserCard';
import TextField from '../components/TextField';

type Props = NativeStackScreenProps<RootStackParamList, 'Product'>;
type ProductScreenRouteProp = Props['route'];

const ProductScreen = () => {
	const { groupName, product } = useRoute<ProductScreenRouteProp>().params;

	useEffect(() => {
		console.log('Product screen test', groupName, product);
	}, [groupName, product]);

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
					<SubTitle>Added</SubTitle>
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
			</HeaderView>
			<SafeAreaView style={[tw`justify-between`, globStyles.container]}>
				<ScrollView style={globStyles.card}>
					<SubTitle style={tw`m-0`}>Edit</SubTitle>
					<TextField placeholder="Test" upperLabel="Test" />
				</ScrollView>
			</SafeAreaView>
		</>
	);
};

export default ProductScreen;
