import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import API, { getHeaders } from './';
import ProductProps from '../types/ProductProps';
import { GroupPropsWithUsers } from '../types/GroupProps';

const useProducts = (token: string | undefined, groupId: string | null) => {
	const [products, setProducts] = useState<ProductProps[] | null>(null);
	const [groupInfo, setGroupInfo] = useState<GroupPropsWithUsers | null>(null);
	const [refreshing, setRefreshing] = useState<boolean>(false);

	const getProducts = async () => {
		try {
			if (token === undefined) throw new Error('User not logged in.');
			if (groupId === null) throw new Error('Group id is null.');

			const groupResponse = await axios.get(
				API(`/groups/${groupId}`),
				getHeaders(token),
			);
			setGroupInfo(groupResponse.data);

			const productsResponse = await axios.get(
				API(`/products/group/${groupId}`),
				getHeaders(token),
			);

			if (productsResponse.data.length === 0) setProducts([]);
			else {
				setProducts(productsResponse.data.reverse());
			}
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		setProducts(null);
		getProducts();
	}, [token, groupId]);

	const addProduct = (newProduct: ProductProps) => {
		setProducts(current =>
			current !== null ? [newProduct, ...current] : [newProduct],
		);
	};

	const refreshProducts = useCallback(() => {
		setRefreshing(true);
		setTimeout(() => getProducts().then(() => setRefreshing(false)), 250);
	}, []);

	return {
		products,
		groupInfo,
		addProduct,
		setProducts,
		refreshing,
		refreshProducts,
	} as const;
};

export default useProducts;
