import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {Label, SubTitle} from './Texts';
import {LabelButton} from './Buttons';
import globStyles from '../styles';
import tw from 'tailwind-react-native-classnames';
import colors from '../theme/colors';

export interface ProductCardProps {
  id: string;
  content: string;
  important?: boolean;
  addedBy: string;
  createdAt: Date;
  /** If it's not null then it should be marked as bought. */
  boughtBy?: string | null;
  /** If it's not null then it should be marked as bought. */
  boughtAt?: Date | null;
  onCheck?: (groupId: string, isChecked: boolean) => void;
  onPress?: (groupId: string) => void;
}

const ProductCard = ({
  id,
  content,
  important,
  addedBy,
  createdAt,
  boughtBy,
  boughtAt,
  onCheck,
  onPress,
}: ProductCardProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(
    boughtBy !== null && boughtAt !== null,
  );
  const theme = useTheme();

  useEffect(() => {
    setIsChecked(boughtBy !== null && boughtAt !== null);
  }, [boughtBy, boughtAt]);

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
        onPress={() => onCheck && onCheck(id, isChecked)}
      />
      <View style={tw`flex-1`}>
        <SubTitle style={tw`mt-0`}>{content}</SubTitle>
        {boughtBy !== null && boughtAt !== null ? (
          <>
            <Label>Bought by {boughtBy}</Label>
            <Label>At {new Date(boughtAt || '').toDateString()}</Label>
          </>
        ) : (
          <>
            <Label>Added by {addedBy}</Label>
            <Label>At {new Date(createdAt).toDateString()}</Label>
          </>
        )}
      </View>
      <LabelButton
        label="View"
        style={tw`m-0 p-0`}
        onPress={() => onPress && onPress(id)}
      />
    </View>
  );
};

export default ProductCard;
