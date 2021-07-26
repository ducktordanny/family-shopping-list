import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useStoreActions } from './storeTypedHooks';
import axios from 'axios';
import API from '../API';

/**
 * Look for user token in storage and if it find it then verify it in API and if it's valid then returns true.
 * In any other situation (e.g. error) it returns false.
 * @returns boolean
 */
const useToken = () => {
	const { getItem } = useAsyncStorage('@user_token');
	const setToken = useStoreActions((state) => state.token.setValue);
	const setUser = useStoreActions((state) => state.user.setValue);
	const setIsLoggedIn = useStoreActions((state) => state.isLoggedIn.setValue);

	const verifyToken = async () => {
		try {
			const storedToken = await getItem();
			if (storedToken !== null) {
				const response = await axios.get(`${API}/token`, {
					headers: {
						Authorization: `Bearer ${storedToken}`,
						'Content-Type': 'application/json',
					},
				});
				console.log(response.data);
				const { token, id, clientId, name, email, picture } =
					response.data;

				// set token:
				setToken(token);

				// set user:
				setUser({ id, clientId, name, email, picture });

				// set status logged in true:
				setIsLoggedIn(true);
			} else {
				console.log('Token is not founf in storage.');
			}
		} catch (err) {
			console.error(err);
		}
	};

	// return response
	verifyToken();
};

export default useToken;
