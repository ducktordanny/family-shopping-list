// TODO: make createdBy type UserLessData
interface GroupProps {
	id: string;
	userIds: string[];
	createdBy: string;
	name: string;
	createdAt: Date;
}

export default GroupProps;
