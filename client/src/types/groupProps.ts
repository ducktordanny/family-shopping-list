import { UserWithLessData } from './UserProps';

export interface GroupPropsWithUsers {
	_id: string;
	members: UserWithLessData[];
	createdBy: UserWithLessData;
	name: string;
	createdAt: Date;
}

interface GroupProps {
	_id: string;
	userIds: string[];
	createdBy: string;
	name: string;
	createdAt: Date;
}

export default GroupProps;
