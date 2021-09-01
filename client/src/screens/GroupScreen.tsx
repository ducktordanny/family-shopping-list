import React, { useEffect } from 'react';
import {
	Text,
	FlatList,
	View,
	SafeAreaView,
	TouchableOpacity,
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
import { LabelButton } from '../components/Buttons';
import globStyles from '../styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Group'>;
type GroupScreenNavigationProp = Props['navigation'];
type GroupScreenRouteProp = Props['route'];

const GroupScreen = () => {
	const { groupId } = useRoute<GroupScreenRouteProp>().params;
	const navigation = useNavigation<GroupScreenNavigationProp>();
	const theme = useTheme();
	const { token } = useStoreState(state => state.user);
	const [products, groupInfo, _addProduct] = useProducts(token, groupId);

	useEffect(() => {
		console.log(products);
	}, [products, groupInfo]);

	return (
		<>
			<HeaderView>
				<View style={tw`flex-row justify-between`}>
					<TouchableOpacity onPress={() => navigation.goBack()}>
						<Icon icon="arrow" width={20} height={20} />
					</TouchableOpacity>
					<Title style={tw`m-0`}>{groupInfo?.name}</Title>
					<TouchableOpacity onPress={() => console.log('Hello World')}>
						<Icon icon="menu" />
					</TouchableOpacity>
				</View>
				<View style={tw`items-center`}>
					<SubTitle>Creator</SubTitle>
					<Label>{groupInfo?.createdBy}</Label>
					<SubTitle>Created at</SubTitle>
					<Label>{new Date(groupInfo?.createdAt || '').toDateString()}</Label>
					<LabelButton label="See members" style={tw`pb-0 mb-0`} />
				</View>
			</HeaderView>
			<SafeAreaView style={[tw`justify-between`, globStyles.container]}>
				{products !== null ? (
					products.length > 0 ? (
						<FlatList
							style={{ paddingTop: 15, paddingHorizontal: 15, width: '100%' }}
							data={products}
							renderItem={({ item }) => (
								// TODO: Make it's own component
								<View
									style={[
										tw`text-center bg-white rounded-xl`,
										{
											backgroundColor: theme.colors.card,
											marginBottom: 15,
											paddingHorizontal: 20,
											paddingVertical: 15,
										},
									]}>
									<Label style={tw`m-0`}>{item.content}</Label>
								</View>
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
			</SafeAreaView>
		</>
	);
};

export default GroupScreen;
