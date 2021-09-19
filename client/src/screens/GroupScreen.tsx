import React, { useEffect } from 'react';
import {
	FlatList,
	View,
	SafeAreaView,
	TouchableOpacity,
	Alert,
} from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/NavigationProps';
import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
import useProducts from '../API/useProducts';
import { useStoreState } from '../hooks/storeTypedHooks';
import Loading from '../components/Loading';
import tw from 'tailwind-react-native-classnames';
import HeaderView from '../containers/HeaderView';
import { Label, SubTitle, Title } from '../components/Texts';
import Icon from '../components/Icon';
import { IconLabelButton, LabelButton } from '../components/Buttons';
import globStyles from '../styles';
import ProductCard from '../components/ProductCard';
import GoBackIcon from '../components/GoBackIcon';
import API, { getHeaders } from '../API';
import axios from 'axios';
import Clipboard from '@react-native-community/clipboard';
import MiniUserCard from '../components/MiniUserCard';

type Props = NativeStackScreenProps<RootStackParamList, 'Group'>;
type GroupScreenNavigationProp = Props['navigation'];
type GroupScreenRouteProp = Props['route'];

const GroupScreen = () => {
	const { groupId } = useRoute<GroupScreenRouteProp>().params;
	const navigation = useNavigation<GroupScreenNavigationProp>();
	const { token } = useStoreState(state => state.user);
	const { products, groupInfo, setProducts, addProduct } = useProducts(
		token,
		groupId,
	);

	const navigateToMembers = () => {
		if (groupInfo === null) return undefined;
		navigation.navigate('GroupMembers', {
			name: groupInfo.name,
			members: groupInfo.members,
		});
	};

	const navigateToProduct = (id: string) => {
		// TODO: we should include the followings: product: ProductProps, groupName: string
		if (!groupInfo || !products) return undefined;
		const product = products.find(element => element._id === id);
		if (!product) return undefined;
		navigation.navigate('Product', { groupName: groupInfo?.name, product });
	};

	const checkProduct = async (id: string, isChecked: boolean) => {
		if (products === null) return undefined;
		try {
			const response = await axios.patch(
				`${API}/products/${isChecked ? 'unbought' : 'bought'}/${id}`,
				undefined,
				getHeaders(token || ''),
			);
			const prodIndex = products.findIndex(element => element._id === id);
			setProducts(current => {
				if (current) {
					return current.map((element, index) =>
						index === prodIndex ? response.data : element,
					);
				}
				return current;
			});
		} catch (err) {
			console.error(err);
		}
	};

	const addProductTrigger = () => {
		Alert.prompt('Add new product:', undefined, [
			{ text: 'Cancel', style: 'destructive' },
			{
				text: 'Add',
				onPress: async content => {
					try {
						const newProduct = await axios.post(
							`${API}/products/create`,
							{
								groupId,
								content,
							},
							getHeaders(token || ''),
						);
						addProduct(newProduct.data);
					} catch (err) {
						console.log(err);
					}
				},
			},
		]);
	};

	const inviteTrigger = () => {
		Clipboard.setString(groupId);
		Alert.alert(
			'Invite',
			'The Id has copied to the clipboard. Other people can join with that Id.',
		);
	};

	return (
		<>
			<HeaderView>
				<View style={tw`flex-row justify-between items-center`}>
					<GoBackIcon />
					<Title style={tw`m-0`}>{groupInfo?.name || '...'}</Title>
					<TouchableOpacity onPress={() => console.log('Hello World')}>
						<Icon icon="menu" />
					</TouchableOpacity>
				</View>
				<View style={tw`items-center`}>
					<SubTitle>Creator</SubTitle>
					{groupInfo !== null && (
						<MiniUserCard
							name={groupInfo.createdBy.name}
							picture={groupInfo.createdBy.picture}
						/>
					)}
					<SubTitle>Created at</SubTitle>
					<Label>
						{groupInfo?.createdAt
							? new Date(groupInfo.createdAt).toDateString()
							: '...'}
					</Label>
					<LabelButton
						label="See members"
						style={tw`pb-0 mb-0`}
						onPress={navigateToMembers}
					/>
				</View>
			</HeaderView>
			<SafeAreaView style={[tw`justify-between`, globStyles.container]}>
				{products !== null ? (
					products.length > 0 ? (
						<FlatList
							style={{ paddingTop: 15, paddingHorizontal: 15, width: '100%' }}
							data={products}
							renderItem={({ item }) => (
								<ProductCard
									id={item._id}
									content={item.content}
									important={item.important}
									addedBy={item.addedBy.name}
									createdAt={item.createdAt}
									boughtBy={item.boughtBy?.name || null}
									boughtAt={item.boughtAt}
									onCheck={checkProduct}
									onPress={navigateToProduct}
								/>
							)}
							keyExtractor={item => item._id}
						/>
					) : (
						<Label style={{ textAlign: 'center', paddingTop: 15 }}>
							There are no products...
						</Label>
					)
				) : (
					<Loading />
				)}
				<View style={tw`flex-row justify-center`}>
					<IconLabelButton
						label="Add product"
						icon="plus"
						style={{ marginVertical: 15 }}
						onPress={addProductTrigger}
					/>
					<IconLabelButton
						label="Invite"
						icon="plus"
						style={{ marginVertical: 15 }}
						onPress={inviteTrigger}
					/>
				</View>
			</SafeAreaView>
		</>
	);
};

export default GroupScreen;
