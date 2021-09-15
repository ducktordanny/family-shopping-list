import ProductProps from './ProductProps';
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
	Product: {
		groupName: string;
		product: ProductProps;
	};
};
