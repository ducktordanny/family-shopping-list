import React from 'react';
import { SafeAreaView, FlatList, Alert } from 'react-native';

import { useStoreState } from '../hooks/storeTypedHooks';
import GroupListElement from '../components/GroupListElement';
import StyledButton from '../components/StyledButton';
import useGetGroups from '../API/useGetGroups';
import useCreateGroup from '../API/useCreateGroup';
import tw from 'tailwind-react-native-classnames';
import Loading from '../components/Loading';

const GroupsScreen = () => {
	const user = useStoreState((state) => state.user.value);
	const token = useStoreState((state) => state.token.value);
	const [groups, addGroup] = useGetGroups(user.id, token);
	const createGroup = useCreateGroup(token);

	const handleGroupCreate = () => {
		Alert.prompt(`New group's name`, undefined, async (name) => {
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
								id={item.id}
								name={item.name}
								createdAt={item.createdAt}
							/>
						)}
						keyExtractor={(item) => `group-${item.id}`}
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
