import React, { useLayoutEffect } from 'react';
import {
	SafeAreaView,
	View,
	TouchableOpacity,
	Image,
	FlatList,
	Alert,
} from 'react-native';
import { useStoreState } from '../hooks/storeTypedHooks';
import GroupListElement from '../components/GroupListElement';
import StyledButton from '../components/StyledButton';
import useGetGroups from '../API/useGetGroups';
import useCreateGroup from '../API/useCreateGroup';
import tw from 'tailwind-react-native-classnames';
import Loading from '../components/Loading';
import { useNavigation } from '@react-navigation/native';

const GroupsScreen = () => {
	const user = useStoreState(state => state.user.value);
	const token = useStoreState(state => state.token.value);
	const [groups, addGroup] = useGetGroups(user.id, token);
	const createGroup = useCreateGroup(token);
	const navigation = useNavigation();

	useLayoutEffect(() => {
		navigation.setOptions({
			title: `${user.name}'s groups`,
			headerRight: () => (
				<View>
					<TouchableOpacity onPress={() => navigation.navigate('Profile')}>
						<Image
							style={[tw`rounded-full border m-2`, { width: 30, height: 30 }]}
							source={{ uri: user?.picture }}
						/>
					</TouchableOpacity>
				</View>
			),
		});
	}, [navigation, user]);

	const handleGroupCreate = () => {
		Alert.prompt("New group's name", undefined, async name => {
			const newGroup = await createGroup(name);
			if (newGroup !== undefined) {
				addGroup(newGroup);
			}
		});
	};

	return (
		<SafeAreaView style={tw`justify-center`}>
			{groups !== null ? (
				<>
					<FlatList
						data={groups}
						renderItem={({ item }) => (
							<GroupListElement
								id={item._id}
								name={item.name}
								createdAt={item.createdAt}
							/>
						)}
						keyExtractor={item => `group-${item._id}`}
					/>
					<StyledButton
						style={tw`mb-2`}
						title="Create new group"
						onPress={() => handleGroupCreate()}
					/>
				</>
			) : (
				<Loading />
			)}
		</SafeAreaView>
	);
};

export default GroupsScreen;
