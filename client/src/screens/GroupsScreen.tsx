import React from 'react';
import { SafeAreaView, ScrollView, Text, Alert } from 'react-native';

import { useStoreState } from '../hooks/storeTypedHooks';
import GroupListElement from '../components/GroupListElement';
import StyledButton from '../components/StyledButton';
import useGetGroups from '../API/useGetGroups';
import useCreateGroup from '../API/useCreateGroup';

// TODO: separate these functions into a hook or whatever...
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
		<SafeAreaView style={{ justifyContent: 'center' }}>
			{groups !== null ? (
				<>
					<ScrollView style={{ borderRadius: 30 }}>
						{groups.map((element, index) => (
							<GroupListElement
								key={`group-${index}`}
								name={element.name}
								createdAt={element.createdAt}
							/>
						))}
					</ScrollView>
					<StyledButton
						style={{ marginBottom: 15 }}
						title="Create group"
						onPress={() => handleGroupCreate()}
					/>
				</>
			) : (
				<Text>Loading...</Text>
			)}
		</SafeAreaView>
	);
};

export default GroupsScreen;
