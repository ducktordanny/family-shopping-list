import {useEffect} from 'react';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {useStoreActions} from './storeTypedHooks';

const useThemeProvider = () => {
  const {getItem, setItem} = useAsyncStorage('@theme');
  const {setDark} = useStoreActions(state => state.theme);

  const setTheme = async () => {
    let storedTheme = await getItem();

    if (storedTheme === null) {
      setItem('dark');
      storedTheme = 'dark';
    }
    setDark(storedTheme === 'dark');
  };

  useEffect(() => {
    setTheme();
  }, []);
};

export default useThemeProvider;
