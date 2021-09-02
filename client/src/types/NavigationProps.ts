import { UserWithLessData } from './UserProps';

export type RootStackParamList = {
	SignIn: undefined;
	Profile: undefined;
	Group: {
		groupId: string;
	};
	GroupMembers: {
		name: string;
		members: UserWithLessData[];
	};
};
