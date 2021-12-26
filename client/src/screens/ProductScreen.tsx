import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';
import GoBackIcon from '../components/GoBackIcon';
import { RootStackParamList } from '../types/NavigationProps';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Label, SubTitle, Title } from '../components/Texts';
import MiniUserCard from '../components/MiniUserCard';
import globStyles from '../styles';
import tw from 'tailwind-react-native-classnames';
import { IconLabelButton, LabelButton } from '../components/Buttons';
import ProductProps from '../types/ProductProps';
import axios from 'axios';
import API, { getHeaders } from '../API';
import Loading from '../components/Loading';
import { useStoreState } from '../hooks/storeTypedHooks';
import ThemedRefreshControl from '../components/ThemedRefreshControl';
import Layout from '../containers/Layout';
import Icon from '../components/Icon';

type Props = NativeStackScreenProps<RootStackParamList, 'Product'>;
type ProductScreenRouteProp = Props['route'];
type GroupProps = NativeStackScreenProps<RootStackParamList, 'Group'>;
type GroupScreenNavigationProp = GroupProps['navigation'];

const ProductScreen = () => {
	const groupNavigation = useNavigation<GroupScreenNavigationProp>();
	const { groupId, groupName, productId } =
		useRoute<ProductScreenRouteProp>().params;
	const token = useStoreState(state => state.user.token);
	const [product, setProduct] = useState<ProductProps | null>(null);
	const [refreshing, setRefreshing] = useState<boolean>(false);

	const getProduct = async () => {
		try {
			const response = await axios.get(
				API(`/products/${productId}`),
				getHeaders(token!),
			);
			setProduct(response.data);
		} catch (err: any) {
			console.error(err.message);
		}
	};

	useEffect(() => {
		getProduct();
	}, []);

	const refreshProduct = useCallback((show: boolean = true) => {
		setRefreshing(show);
		setTimeout(() => getProduct().then(() => setRefreshing(false)), 250);
	}, []);

	const renameProduct = async (content: string) => {
		try {
			if (productId === undefined || token === undefined)
				throw new Error('[ProductScreen] Token is undefined.');
			const response = await axios.patch(
				API('/products/rename'),
				{ id: productId, content },
				getHeaders(token),
			);
			const { modified } = response.data;
			if (modified) {
				setProduct(current => (current ? { ...current, content } : null));
			}
		} catch (err: any) {
			console.error(err);
		}
	};

	const toggleImportant = async () => {
		try {
			const response = await axios.patch(
				API(`/products/important/toggle/${productId}`),
				undefined,
				getHeaders(token!),
			);
			console.log(response.data);
			if (response.status === 200) {
				setProduct(current =>
					current ? { ...current, important: !current?.important } : null,
				);
			}
		} catch (err) {
			console.error(err);
		}
	};

	const renamePrompt = () => {
		Alert.prompt('Rename', 'Enter the new name of product', [
			{ text: 'Cancel', style: 'destructive' },
			{
				text: 'Rename',
				onPress: async content => {
					if (content === undefined) return undefined;
					await renameProduct(content);
				},
			},
		]);
	};

	const headerContent = (
		<>
			<View style={tw`flex-row items-center justify-between`}>
				<GoBackIcon
					onNavigation={() => groupNavigation.navigate('Group', { groupId })}
				/>
				<Title style={tw`m-0`}>{groupName}</Title>
				<TouchableOpacity onPress={() => console.log('Delete...')}>
					<Icon icon="crossed" width={20} height={20} />
				</TouchableOpacity>
			</View>
			<View style={tw`items-center`}>
				<SubTitle style={{ marginTop: 10 }}>
					{product?.content || '...'}
				</SubTitle>
			</View>
		</>
	);

	const bodyContent = (
		<>
			<ScrollView
				style={globStyles.card}
				refreshControl={
					<ThemedRefreshControl
						refreshing={refreshing}
						onRefresh={refreshProduct}
					/>
				}>
				{product ? (
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
						<SubTitle>Edit</SubTitle>
						<LabelButton
							style={tw`p-0`}
							label="Product name"
							onPress={renamePrompt}
						/>
						<LabelButton
							style={tw`p-0`}
							label={
								product.important
									? 'Remove important mark'
									: 'Mark as important'
							}
							onPress={toggleImportant}
						/>
					</View>
				) : (
					<Loading />
				)}
			</ScrollView>
		</>
	);

	return <Layout header={headerContent} body={bodyContent} />;
};

export default ProductScreen;
