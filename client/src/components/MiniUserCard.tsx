import React from 'react';
import {View, Image} from 'react-native';
import {Label} from './Texts';
import {UserWithLessData} from '../types/UserProps';
import tw from 'tailwind-react-native-classnames';
import {useTheme} from '@react-navigation/native';

const MiniUserCard = ({name, picture}: UserWithLessData) => {
  const theme = useTheme();

  return (
    <View
      style={[
        tw`flex flex-row items-center justify-center border rounded-lg`,
        {
          paddingVertical: 5,
          paddingHorizontal: 10,
          marginVertical: 10,
          borderColor: theme.colors.text,
        },
      ]}>
      <Image
        style={[
          tw`rounded-full`,
          {
            width: 25,
            height: 25,
            marginRight: 10,
          },
        ]}
        source={{uri: picture}}
      />
      <Label style={tw`m-0`}>{name}</Label>
    </View>
  );
};

export default MiniUserCard;
