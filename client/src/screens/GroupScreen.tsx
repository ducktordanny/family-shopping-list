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
import ProductCard from '../components/ProductCard';
import GoBackIcon from '../components/GoBackIcon';

type Props = NativeStackScreenProps<RootStackParamList, 'Group'>;
type GroupScreenNavigationProp = Props['navigation'];
type GroupScreenRouteProp = Props['route'];

const GroupScreen = () => {
	const { groupId } = useRoute<GroupScreenRouteProp>().params;
	const navigation = useNavigation<GroupScreenNavigationProp>();
	const { token } = useStoreState(state => state.user);
	const [products, groupInfo, _addProduct] = useProducts(token, groupId);

	const navigateToMembers = () => {
		if (groupInfo === null) return undefined;
		navigation.navigate('GroupMembers', {
			name: groupInfo.name,
			members: groupInfo.members,
		});
	};

	return (
		<>
			<HeaderView>
				<View style={tw`flex-row justify-between items-center`}>
					<GoBackIcon />
					<Title style={tw`m-0`}>{groupInfo?.name}</Title>
					<TouchableOpacity onPress={() => console.log('Hello World')}>
						<Icon icon="menu" />
					</TouchableOpacity>
				</View>
				<View style={tw`items-center`}>
					<SubTitle>Creator</SubTitle>
					<Label>{groupInfo?.createdBy.name}</Label>
					<SubTitle>Created at</SubTitle>
					<Label>{new Date(groupInfo?.createdAt || '').toDateString()}</Label>
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
									content={item.content}
									important={item.important}
									addedBy={item.addedBy.name}
									createdAt={item.createdAt}
									boughtBy={item.boughtBy?.name || null}
									boughtAt={item.boughtAt || null}
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
			</SafeAreaView>
		</>
	);
};

export default GroupScreen;
