export type RootStackParamList = {
	SignIn: undefined;
	Profile: undefined;
	Group: {
		groupId: string;
	};
	GroupMembers: {
		productId: string;
		name: string;
	};
	Product: {
		groupId: string;
		groupName: string;
		productId: string;
	};
};
