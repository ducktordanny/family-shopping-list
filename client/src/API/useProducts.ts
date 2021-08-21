import { useState, useEffect } from 'react';
import axios from 'axios';

import API, { getHeaders } from './';
import ProductProps from '../types/ProductProps';

const useProducts = (token: string | undefined, groupId: string | null) => {
	const [products, setProducts] = useState<ProductProps[] | null>(null);

	useEffect(() => {
		const getProducts = async () => {
			try {
				if (token === undefined) throw new Error('User not logged in.');
				if (groupId === null) throw new Error('Group id is null.');

				const response = await axios.get(
					`${API}/products/group/${groupId}`,
					getHeaders(token),
				);

				if (response.data.length === 0) setProducts([]);
				else {
					response.data.forEach((element: any) => {
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

	return [products, addProduct] as const;
};

export default useProducts;
