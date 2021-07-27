export interface LoginScreenProps {
	token: string | null;
	login: (provider: 'google' | 'facebook') => void;
}
