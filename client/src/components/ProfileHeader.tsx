import React from 'react';
import { View, Image, Text } from 'react-native';

interface ProfileHeaderProps {
	name: string;
	email: string;
	imageURI: string;
}

const ProfileHeader = ({ name, email, imageURI }: ProfileHeaderProps) => {
	return (
		<View
			style={{
				paddingVertical: 15,
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<Image
				style={{
					height: 50,
					width: 50,
					borderRadius: 50,
					marginRight: 15,
					borderWidth: 1,
					borderColor: '#000',
				}}
				source={{ uri: imageURI }}
			/>
			<View>
				<Text
					style={{
						textAlign: 'center',
						fontWeight: 'bold',
						fontSize: 28,
					}}
				>
					{name}
				</Text>
				<Text style={{ textAlign: 'center' }}>{email}</Text>
			</View>
		</View>
	);
};

export default ProfileHeader;
