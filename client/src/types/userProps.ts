interface User {
	_id: string;
	clientId: string;
	name: string;
	email: string;
	picture: string;
	provider: 'google' | 'facebook';
	createdAt: Date;
}

export interface UserWithLessData {
	_id?: string;
	name: string;
	picture: string;
}

export default User;
