import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, FlatList } from 'react-native';
import { UserWithLessData } from '../types/UserProps';
import HeaderView from '../containers/HeaderView';
import GoBackIcon from '../components/GoBackIcon';
import { Title } from '../components/Texts';
import tw from 'tailwind-react-native-classnames';
import UserCard from '../components/UserCard';
import { useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/NavigationProps';
import axios from 'axios';
import API, { getHeaders } from '../API';
import { useStoreState } from '../hooks/storeTypedHooks';
import Loading from '../components/Loading';

type Props = NativeStackScreenProps<RootStackParamList, 'GroupMembers'>;
type GroupMembersScreenRouteProp = Props['route'];

const GroupMembersScreen = () => {
	const { productId, name } = useRoute<GroupMembersScreenRouteProp>().params;
	const token = useStoreState(state => state.user.token);
	const [members, setMembers] = useState<UserWithLessData[] | null>(null);

	// TODO: refactor: maybe we should make a hook for this
	useEffect(() => {
		const getMembers = async () => {
			if (token === undefined) return;
			const response = await axios.get(
				API(`/groups/members/${productId}`),
				getHeaders(token),
			);
			setMembers(response.data);
		};
		getMembers();
	}, []);

	return (
		<>
			<HeaderView style={tw`flex-row justify-between`}>
				<GoBackIcon />
				<Title style={tw`m-0`}>{name}</Title>
				<View style={{ width: 20 }}></View>
			</HeaderView>
			<SafeAreaView style={tw`flex-1`}>
				{members ? (
					<FlatList
						style={{ paddingTop: 15, paddingHorizontal: 15, width: '100%' }}
						data={members}
						renderItem={({ item }) => <UserCard user={item} />}
						keyExtractor={item => item._id!}
					/>
				) : (
					<Loading />
				)}
			</SafeAreaView>
		</>
	);
};

export default GroupMembersScreen;
