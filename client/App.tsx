import React from 'react';
import {StoreProvider} from 'easy-peasy';

import store from './src/store';
import ScreenHandler from './src/containers/ScreenHandler';

const App = () => {
  return (
    <StoreProvider store={store}>
      <ScreenHandler />
    </StoreProvider>
  );
};

export default App;
