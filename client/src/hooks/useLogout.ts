import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useStoreActions } from '../hooks/storeTypedHooks';

const useLogout = () => {
	const { removeItem } = useAsyncStorage('@user_token');
	const setToken = useStoreActions((state) => state.token.setValue);
	const setUser = useStoreActions((state) => state.user.setValue);
	const setIsLoggedIn = useStoreActions((state) => state.isLoggedIn.setValue);

	const logout = async () => {
		setIsLoggedIn(false);
		await removeItem();
		setToken(undefined);
		setUser({
			id: undefined,
			clientId: undefined,
			name: undefined,
			email: undefined,
			picture: undefined,
		});
	};

	return logout;
};

export default useLogout;
