import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Label, SubTitle } from './Texts';
import { LabelButton } from './Buttons';
import globStyles from '../styles';
import tw from 'tailwind-react-native-classnames';
import colors from '../theme/colors';

export interface ProductCardProps {
	content: string;
	important?: boolean;
	addedBy: string;
	createdAt: Date;
	/** If it's not null then it should be marked as bought. */
	boughtBy?: string | null;
	/** If it's not null then it should be marked as bought. */
	boughtAt?: Date | null;
	onPress?: () => void;
}

const ProductCard = ({
	content,
	important,
	addedBy,
	createdAt,
	boughtBy,
	boughtAt,
	onPress,
}: ProductCardProps) => {
	const [isChecked, setIsChecked] = useState<boolean>(
		boughtBy !== null && boughtAt !== null,
	);
	const theme = useTheme();

	useEffect(() => {
		setIsChecked(boughtBy !== null && boughtAt !== null);
	}, [boughtBy, boughtAt]);

	const handleCheckboxChecking = () => {
		// TODO: API handling
		setIsChecked(current => !current);
	};

	return (
		<View
			style={[
				tw`flex-row items-center`,
				globStyles.card,
				{
					backgroundColor: important
						? theme.dark
							? colors.important.dark
							: colors.important.light
						: theme.colors.card,
				},
			]}>
			<BouncyCheckbox
				size={20}
				iconStyle={{
					borderColor: isChecked ? colors.buttonLabel : theme.colors.text,
					borderRadius: 5,
				}}
				fillColor={colors.buttonLabel}
				isChecked={isChecked}
				onPress={handleCheckboxChecking}
			/>
			<View style={tw`flex-1`}>
				<SubTitle style={tw`mt-0`}>{content}</SubTitle>
				{boughtBy !== null && boughtAt !== null ? (
					<>
						<Label>Bought by {boughtBy}</Label>
						<Label>At {boughtAt}</Label>
					</>
				) : (
					<>
						<Label>Added by {addedBy}</Label>
						<Label>At {new Date(createdAt).toDateString()}</Label>
					</>
				)}
			</View>
			<LabelButton label="View" style={tw`m-0 p-0`} onPress={onPress} />
		</View>
	);
};

export default ProductCard;
