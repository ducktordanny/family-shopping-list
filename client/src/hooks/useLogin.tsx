import { useState, useEffect } from 'react';
import { Linking, Platform } from 'react-native';
import SafariView from 'react-native-safari-view';

import userProps from '../types/userProps';
import API from '../API';

/**
 * @returns [token, user, login, logout] as const;
 *
 * Until the login function of the hook hasn't called the token and the user will be null.
 * With calling the logout function we set them back to null.
 */
const useLogin = () => {
	const [token, setToken] = useState<string | null>(null);
	const [user, setUser] = useState<userProps | null>(null);

	useEffect(() => {
		const handleOpenURL = ({ url }: { url: string }) => {
			try {
				const userString = url.match(/user=([^#]+)/);
				const userObject = JSON.parse(decodeURI(userString![1]));

				setToken(userObject.token);
				delete userObject.token;
				setUser(userObject);
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

	const login = (provider: 'google' | 'facebook') =>
		openUrl(`${API}/auth/${provider}`);
	const logout = () => {
		setUser(null);
		setToken(null);
	};

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

	return [token, user, login, logout] as const;
};

export default useLogin;
