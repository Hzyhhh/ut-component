import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import React from 'react';

import * as eva from '@eva-design/eva';

import Router from './container/Router';
import {
  FeatherIconsPack,
  FontAwesomeIconsPack,
  IoniconsPack,
  MaterialIconsPack,
} from './libs/IconsPack';

const App = () => {
  return (
    <>
      <IconRegistry
        icons={[
          FeatherIconsPack,
          MaterialIconsPack,
          IoniconsPack,
          FontAwesomeIconsPack,
        ]}
      />
      <ApplicationProvider {...eva} theme={eva.light}>
        <Router />
      </ApplicationProvider>
    </>
  );
};

export default App;
