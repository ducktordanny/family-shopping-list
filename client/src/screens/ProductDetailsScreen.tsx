import React, { useEffect } from 'react';
import { Button, Image, SafeAreaView, Text } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useStoreState } from '../hooks/storeTypedHooks';
import useOneProduct from '../API/useOneProduct';
import { useNavigation } from '@react-navigation/core';
import Loading from '../components/Loading';

const ProductDetailsScreen = () => {
	const token = useStoreState((state) => state.token.value);
	const productId = useStoreState((state) => state.chosenProduct.id);
	const product = useOneProduct(token, productId);
	const navigation = useNavigation();

	return (
		<SafeAreaView style={tw`bg-white h-full items-center`}>
			{product !== null ? (
				<>
					<Text style={tw`text-2xl font-bold`}>
						{product.content}
					</Text>
					<Text style={tw`text-xl`}>Added by:</Text>
					<Image
						style={{
							width: 50,
							height: 50,
							borderRadius: 50,
							marginRight: 15,
							borderWidth: 1,
							borderColor: '#000',
						}}
						source={{ uri: product.addedBy.picture }}
					/>
					<Text style={tw`text-lg`}>{product.addedBy.name}</Text>
					<Text style={tw`text-xl`}>
						Created at{' '}
						{new Date(product.createdAt).toLocaleString()}
					</Text>
					{product.important && <Text style={tw``}>Important!</Text>}
					<Button
						title="Go back to group"
						onPress={() => navigation.goBack()}
					/>
				</>
			) : (
				<Loading />
			)}
		</SafeAreaView>
	);
};

export default ProductDetailsScreen;
