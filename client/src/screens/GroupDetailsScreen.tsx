import React from 'react';
import { View, SafeAreaView, Text, Alert, FlatList } from 'react-native';
import { useStoreState } from '../hooks/storeTypedHooks';
import StyledButton from '../components/StyledButton';
import useProducts from '../API/useProducts';
import ProcuctListElement from '../components/ProductListElement';
import tw from 'tailwind-react-native-classnames';
import Loading from '../components/Loading';
import useCreateProduct from '../API/useCreateProduct';

const GroupDetailsScreen = () => {
	const token = useStoreState((state) => state.token.value);
	const { id, name } = useStoreState((state) => state.chosenGroup);
	const [products, addProduct] = useProducts(token, id);
	const createProduct = useCreateProduct(token);

	const handleProductCreate = () => {
		Alert.prompt(
			'New product content',
			undefined,
			async (productContent) => {
				const newProduct = await createProduct(id, productContent);
				if (newProduct !== undefined) {
					addProduct(newProduct);
				}
			}
		);
	};

	return id === null || name === null ? (
		<View style={tw`h-full justify-center items-center`}>
			<Text style={tw`text-red-500`}>Something went wrong.</Text>
		</View>
	) : (
		<SafeAreaView style={tw`justify-center`}>
			{products !== null ? (
				<>
					<FlatList
						data={products}
						renderItem={({ item }) => (
							<ProcuctListElement product={item} />
						)}
						keyExtractor={(item) => `prod-${item._id}`}
					/>
					<StyledButton
						style={tw`mb-2`}
						title="Add new product"
						onPress={() => handleProductCreate()}
					/>
				</>
			) : (
				<Loading />
			)}
		</SafeAreaView>
	);
};

export default GroupDetailsScreen;
