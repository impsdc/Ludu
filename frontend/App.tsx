import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNav from './src/navigation/Navigator';
import { navigationRef } from './src/navigation/rootNavigation';
import { Provider } from 'react-redux';
import store from './src/store';
import LogoAnim from './src/components/LogoAnim';

const App = () => {
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 3400);
  // }, []);

  if (!loading)
    return (
      <Provider store={store}>
        <NavigationContainer ref={navigationRef}>
          <StackNav />
        </NavigationContainer>
      </Provider>
    );

  return <LogoAnim />;
};

export default App;
