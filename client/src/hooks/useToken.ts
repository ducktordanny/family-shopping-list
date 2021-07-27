import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useStoreActions } from './storeTypedHooks';
import axios from 'axios';
import API from '../API';

/**
 * Look for user token in storage and if it find it then verify it in API and if it is valid then sets everything.
 * @returns boolean
 */
const useToken = () => {
	const { getItem } = useAsyncStorage('@user_token');
	const setToken = useStoreActions((state) => state.token.setValue);
	const setUser = useStoreActions((state) => state.user.setValue);
	const setIsLoggedIn = useStoreActions((state) => state.isLoggedIn.setValue);

	const verifyToken = async () => {
		try {
			const token = await getItem();
			if (token !== null) {
				const response = await axios.get(`${API}/token`, {
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				});
				const {
					_id: id,
					clientId,
					name,
					email,
					picture,
				} = response.data;

				// set token:
				setToken(token);

				// set user:
				setUser({ id, clientId, name, email, picture });

				// set status logged in true:
				setIsLoggedIn(true);
			} else {
				console.log('Token is not found in storage.');
			}
		} catch (err) {
			console.error(err);
		}
	};

	verifyToken();
};

export default useToken;
