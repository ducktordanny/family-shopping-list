import { useEffect } from 'react';
import { Linking, Platform } from 'react-native';
import SafariView from 'react-native-safari-view';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

import API from '../API';
import { useStoreActions } from './storeTypedHooks';

/**
 * @returns [token, user, login, logout] as const;
 *
 * Until the login function of the hook hasn't called the token and the user will be null.
 * With calling the logout function we set them back to null.
 */
const useLogin = () => {
	const { setItem } = useAsyncStorage('@user_token');
	const setToken = useStoreActions((state) => state.token.setValue);
	const setUser = useStoreActions((state) => state.user.setValue);
	const setIsLoggedIn = useStoreActions((state) => state.isLoggedIn.setValue);

	useEffect(() => {
		const handleOpenURL = async ({ url }: { url: string }) => {
			try {
				const userString = url.match(/user=([^#]+)/);
				const userObject = JSON.parse(decodeURI(userString![1]));
				const { token, id, clientId, name, email, picture } =
					userObject;

				// set token:
				await setItem(token);
				setToken(token);

				// set user:
				setUser({ id, clientId, name, email, picture });

				// set status logged in true:
				setIsLoggedIn(true);
			} catch (err) {
				console.error(
					`Something went wrong during login. Message: ${err.message}`
				);
			}

			if (Platform.OS === 'ios') SafariView.dismiss();
		};

		Linking.addEventListener('url', handleOpenURL);
		// Launched from an external URL
		Linking.getInitialURL().then((url) => {
			if (url) {
				handleOpenURL({ url });
			}
		});

		return () => {
			Linking.removeEventListener('url', handleOpenURL);
		};
	}, []);

	const loginWith = (provider: 'google' | 'facebook') =>
		openUrl(`${API}/auth/${provider}`);

	const openUrl = (url: string) => {
		if (Platform.OS === 'ios') {
			SafariView.isAvailable()
				.then(() =>
					SafariView.show({
						url,
						fromBottom: true,
					})
				)
				.catch((err) =>
					console.error(
						`Something went wrong during login. Message: ${err.message}`
					)
				);
		} else {
			Linking.openURL(url);
		}
	};

	return loginWith;
};

export default useLogin;
