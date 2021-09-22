import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductProps from '../types/ProductProps';
import API, { getHeaders } from '.';
import { UserWithLessData } from '../types/UserProps';

const useOneProduct = (token: string | undefined, productId: string | null) => {
	const [prodData, setProdData] = useState<ProductProps | null>(null);

	const getOneProduct = async () => {
		try {
			if (token === undefined) throw new Error('Token is not specified');
			if (productId === null) throw new Error('Product id is not specified.');

			const response = await axios.get(
				API(`/products/${productId}`),
				getHeaders(token),
			);

			const {
				_id,
				content,
				important,
				addedBy,
				boughtBy,
				boughtAt,
				createdAt,
			} = response.data;

			setProdData({
				_id,
				content,
				important,
				addedBy,
				boughtBy,
				boughtAt,
				createdAt,
			});
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		getOneProduct();
	}, []);

	return prodData;
};

export default useOneProduct;
