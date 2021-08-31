import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useStoreActions } from '../hooks/storeTypedHooks';

const useLogout = () => {
	const { removeItem } = useAsyncStorage('@user_token');
	const { setToken, setUser, setIsLogged } = useStoreActions(
		state => state.user,
	);

	const logout = async () => {
		setIsLogged(false);
		await removeItem();
		setToken(undefined);
		setUser({
			id: undefined,
			clientId: undefined,
			name: undefined,
			email: undefined,
			picture: undefined,
			provider: undefined,
			createdAt: undefined,
		});
	};

	return logout;
};

export default useLogout;
