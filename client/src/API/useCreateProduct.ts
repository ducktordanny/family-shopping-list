import ProductProps from '../types/ProductProps';
import axios from 'axios';
import API, { getHeaders } from './';
import { UserWithLessData } from '../types/UserProps';

const useCreateProduct = (token: string | undefined) => {
	const createProduct = async (
		groupId: string | null,
		productContent: string,
	): Promise<ProductProps | undefined> => {
		try {
			if (token === undefined) throw new Error('User not logged in.');
			if (groupId === null) throw new Error('Missing group id.');

			const response = await axios.post(
				API(`/products/create`),
				{
					groupId,
					content: productContent,
				},
				getHeaders(token),
			);
			console.log(response.data);

			if (!response.data) throw new Error('No response.');
			const addedBy: UserWithLessData = response.data.addedBy;
			const { _id, content, important, boughtBy, boughtAt, createdAt } =
				response.data;
			const newProduct: ProductProps = {
				_id,
				content,
				important,
				boughtBy,
				boughtAt,
				createdAt,
				addedBy,
			};

			return newProduct;
		} catch (err) {
			console.error(err);
			return undefined;
		}
	};

	return createProduct;
};

export default useCreateProduct;
