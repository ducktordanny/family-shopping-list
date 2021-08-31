import React from 'react';
import { View } from 'react-native';

import Arrow from '../assets/arrow.svg';
import Crossed from '../assets/crossed.svg';
import Plus from '../assets/plus.svg';
import Pipe from '../assets/pipe.svg';
import Logout from '../assets/logout.svg';
import Facebook from '../assets/facebook.svg';
import Google from '../assets/google.svg';

import IconProps from '../types/Icons';

const icons = {
	arrow: <Arrow width={15} height={15} />,
	crossed: <Crossed width={15} height={15} />,
	plus: <Plus width={15} height={15} />,
	pipe: <Pipe width={15} height={15} />,
	logout: <Logout width={20} height={20} />,
	facebook: <Facebook width={15} height={15} />,
	google: <Google width={15} height={15} />,
};

const Icon = ({ icon, style }: IconProps) => (
	<View style={style}>{icons[icon]}</View>
);

export default Icon;
