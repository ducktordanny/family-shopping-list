import React from 'react';
import { SafeAreaView, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useStoreState } from '../hooks/storeTypedHooks';

import styles from '../styles';
import useLogout from '../hooks/useLogout';
import ProfileHeader from '../components/ProfileHeader';

const ProfileScreen = () => {
	const navigation = useNavigation();
	const user = useStoreState((state) => state.user.value);
	const isLoggedIn = useStoreState((state) => state.isLoggedIn.value);
	const logout = useLogout();

	return (
		<SafeAreaView style={styles.container}>
			{isLoggedIn && (
				<>
					<ProfileHeader
						name={user.name || ''}
						email={user.email || ''}
						imageURI={user.picture || ''}
					/>
					<Button
						title="See own groups"
						onPress={() =>
							navigation.navigate('Groups', { name: 'Something' })
						}
					/>
					<Button title="Logout" onPress={() => logout()} />
				</>
			)}
		</SafeAreaView>
	);
};

export default ProfileScreen;
