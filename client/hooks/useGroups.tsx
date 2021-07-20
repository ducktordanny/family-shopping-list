import { useState, useEffect } from 'react';
import groupProps from '../types/groupProps';

const useGroups = () => {
	const [groups, setGroups] = useState<groupProps[]>([]);

	// ...
};

export default useGroups;
