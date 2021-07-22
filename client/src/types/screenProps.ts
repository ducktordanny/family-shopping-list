export interface loginScreenProps {
	token: string | null;
	login: (provider: 'google' | 'facebook') => void;
}
