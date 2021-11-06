import React, { useEffect } from 'react';
import { SafeAreaView, FlatList, View, Image, Alert } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useStoreState } from '../hooks/storeTypedHooks';

import globStyles from '../styles';
import HeaderView from '../containers/HeaderView';
import tw from 'tailwind-react-native-classnames';
import ThemeSwitcher from '../components/ThemeSwitcher';

import { Title, SubTitle, Label } from '../components/Texts';
import Logout from '../components/Logout';
import GroupCard from '../components/GroupCard';
import { IconLabelButton } from '../components/Buttons';
import useGroups from '../API/useGroups';
import { capitalizeFirst } from '../lib/strings';
import useCreateGroup from '../API/useCreateGroup';
import Loading from '../components/Loading';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/NavigationProps';
import useJoin from '../API/useJoin';
import ThemedRefreshControl from '../components/ThemedRefreshControl';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;
type ProfileScreenNavigationProp = Props['navigation'];

const ProfileScreen = () => {
	const navigation = useNavigation<ProfileScreenNavigationProp>();
	const user = useStoreState(state => state.user);
	const isFocused = useIsFocused();
	const { groups, addGroup, refreshing, refreshGroups } = useGroups(
		user.id,
		user.token,
	);
	const createGroup = useCreateGroup(user.token);
	const joinTo = useJoin(user.token);

	useEffect(() => {
		if (!isFocused) return undefined;
		refreshGroups(false);
	}, [isFocused]);

	const createGroupTrigger = () => {
		Alert.prompt('The name of the new group:', undefined, [
			{ text: 'Cancel', style: 'destructive' },
			{
				text: 'Create',
				onPress: async name => {
					try {
						if (name === undefined || name?.trim() === '')
							throw new Error('Invlaid name.');
						const newGroup = await createGroup(name);
						if (newGroup !== undefined) {
							addGroup(newGroup);
						}
					} catch (err) {
						console.log('Create group:', err);
					}
				},
			},
		]);
	};

	const joinToGroup = () => {
		Alert.prompt('Join', "ID of the group where you'd like to join: ", [
			{ text: 'Cancel', style: 'destructive' },
			{
				text: 'Join',
				onPress: async groupId => {
					try {
						const newGroup = await joinTo(groupId);
						if (newGroup !== undefined) {
							addGroup(newGroup);
						}
					} catch (err) {
						console.log(err);
					}
				},
			},
		]);
	};

	const navigateTo = (groupId: string) => {
		navigation.navigate('Group', { groupId });
	};

	return (
		<>
			<HeaderView style={tw`flex-row justify-between`}>
				<Logout />
				<View style={tw`items-center`}>
					<Image
						style={[tw`rounded-full`, { width: 60, height: 60 }]}
						source={{
							uri: user.picture || 'https://i.imgur.com/Yrz6oBC.png',
						}}
					/>
					<Title>{user.name}</Title>
					<Label>Logged in via {capitalizeFirst(user.provider || '')}</Label>
					<Label>{user.email}</Label>
					<SubTitle>Member since</SubTitle>
					<Label>{new Date(user.createdAt || '').toDateString()}</Label>
				</View>
				<ThemeSwitcher style={tw`absolute top-0 right-0`} />
			</HeaderView>

			<SafeAreaView style={[tw`justify-between`, globStyles.container]}>
				{groups !== null ? (
					// if there was a group check:
					groups?.length > 0 ? (
						<FlatList
							style={{
								paddingTop: 15,
								paddingHorizontal: 15,
								width: '100%',
							}}
							data={groups}
							renderItem={({ item }) => (
								<GroupCard
									name={item.name}
									members={item.userIds.length}
									onPress={() => navigateTo(item._id)}
								/>
							)}
							keyExtractor={item => item._id}
							refreshControl={
								<ThemedRefreshControl
									refreshing={refreshing}
									onRefresh={refreshGroups}
								/>
							}
						/>
					) : (
						<Label style={{ textAlign: 'center', paddingTop: 15 }}>
							You have no groups...
						</Label>
					)
				) : (
					// waiting for checking if there are any groups
					<Loading />
				)}
				<View style={tw`flex-row justify-center`}>
					<IconLabelButton
						label="Create group"
						icon="plus"
						style={{ marginVertical: 15 }}
						onPress={createGroupTrigger}
					/>
					<IconLabelButton
						label="Join"
						icon="plus"
						style={{ marginVertical: 15 }}
						onPress={joinToGroup}
					/>
				</View>
			</SafeAreaView>
		</>
	);
};

export default ProfileScreen;
