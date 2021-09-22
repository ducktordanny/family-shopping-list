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
		groupName: string;
		productId: string;
	};
};
