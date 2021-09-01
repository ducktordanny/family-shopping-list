import { useState, useEffect } from 'react';
import axios from 'axios';

import API, { getHeaders } from './';
import ProductProps from '../types/ProductProps';
import GroupProps from '../types/GroupProps';

const useProducts = (token: string | undefined, groupId: string | null) => {
	const [products, setProducts] = useState<ProductProps[] | null>(null);
	const [groupInfo, setGroupInfo] = useState<GroupProps | null>(null);

	useEffect(() => {
		const getProducts = async () => {
			try {
				if (token === undefined) throw new Error('User not logged in.');
				if (groupId === null) throw new Error('Group id is null.');

				const groupResponse = await axios.get(
					`${API}/groups/id/${groupId}`,
					getHeaders(token),
				);
				setGroupInfo(groupResponse.data[0]);

				const productsResponse = await axios.get(
					`${API}/products/group/${groupId}`,
					getHeaders(token),
				);

				if (productsResponse.data.length === 0) setProducts([]);
				else {
					productsResponse.data.forEach((element: any) => {
						const prod: ProductProps = element;

						setProducts(current =>
							current !== null ? [prod, ...current] : [prod],
						);
					});
				}
			} catch (err) {
				console.error(err);
			}
		};
		setProducts(null);
		getProducts();
	}, [token, groupId]);

	// TODO: finish this part and use it after API response
	const addProduct = (newProduct: ProductProps) => {
		setProducts(current =>
			current !== null ? [newProduct, ...current] : [newProduct],
		);
	};

	return [products, groupInfo, addProduct] as const;
};

export default useProducts;
