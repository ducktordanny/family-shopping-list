import React from 'react';
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

type Props = NativeStackScreenProps<RootStackParamList, 'GroupMembers'>;
type GroupMembersScreenRouteProp = Props['route'];

const GroupMembersScreen = () => {
	const { name, members } = useRoute<GroupMembersScreenRouteProp>().params;

	return (
		<>
			<HeaderView style={tw`flex-row justify-between`}>
				<GoBackIcon />
				<Title style={tw`m-0`}>{name}</Title>
				<View></View>
			</HeaderView>
			<SafeAreaView style={tw`flex-1`}>
				<FlatList
					style={{ paddingTop: 15, paddingHorizontal: 15, width: '100%' }}
					data={members}
					renderItem={({ item }) => <UserCard user={item} />}
					keyExtractor={item => item._id}
				/>
			</SafeAreaView>
		</>
	);
};

export default GroupMembersScreen;
