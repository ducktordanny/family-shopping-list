import React from 'react';
import { View } from 'react-native';

import Arrow from '../assets/arrow.svg';
import Crossed from '../assets/crossed.svg';
import Plus from '../assets/plus.svg';
import Pipe from '../assets/pipe.svg';
import Logout from '../assets/logout.svg';
import Menu from '../assets/menu.svg';
import Facebook from '../assets/facebook.svg';
import Google from '../assets/google.svg';

import IconProps from '../types/Icons';

const icons = {
	arrow: (width: number = 15, height: number = 15) => (
		<Arrow width={width} height={height} />
	),
	crossed: (width: number = 15, height: number = 15) => (
		<Crossed width={width} height={height} />
	),
	plus: (width: number = 15, height: number = 15) => (
		<Plus width={width} height={height} />
	),
	pipe: (width: number = 15, height: number = 15) => (
		<Pipe width={width} height={height} />
	),
	logout: (width: number = 20, height: number = 20) => (
		<Logout width={width} height={height} />
	),
	menu: (width: number = 20, height: number = 20) => (
		<Menu width={width} height={height} />
	),
	facebook: (width: number = 15, height: number = 15) => (
		<Facebook width={width} height={height} />
	),
	google: (width: number = 15, height: number = 15) => (
		<Google width={width} height={height} />
	),
};

const Icon = ({ icon, height, width, style }: IconProps) => (
	<View style={style}>{icons[icon](width, height)}</View>
);

export default Icon;
