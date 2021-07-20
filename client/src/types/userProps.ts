interface userProps {
	_id: string;
	clientId: string;
	name: string;
	email: string;
	picture: string;
	provider: 'google' | 'facebook';
	createdAt: Date;
}

export default userProps;
