import React from 'react';
import { View, Text, Button } from 'react-native';
import ProductProps from '../types/ProductProps';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import { useStoreActions } from '../hooks/storeTypedHooks';

const ProcuctListElement = ({ product }: { product: ProductProps | null }) => {
	const setChosenProduct = useStoreActions(
		(state) => state.chosenProduct.setValue
	);
	const navigation = useNavigation();

	return (
		<View
			style={tw`mt-4 mx-4 p-4 rounded-xl bg-white flex-row justify-between items-center`}
		>
			<View>
				<Text style={tw`text-base font-semibold`}>
					{product?.content}
				</Text>
				<Text>Added by: {product?.addedBy.name}</Text>
				<Text>
					{product?.boughtBy?.name
						? `Bought by: ${product?.boughtBy?.name}`
						: 'Needed'}
				</Text>
			</View>
			<Button
				title="View"
				onPress={() => {
					if (product) {
						setChosenProduct({
							id: product._id,
							content: product.content,
						});
					}
					navigation.navigate('Product details');
				}}
			/>
		</View>
	);
};

export default ProcuctListElement;
