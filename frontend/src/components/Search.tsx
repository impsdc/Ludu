import React from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import { TextInput, Switch } from 'react-native-paper';
import findRoutes from '../navigation/appRoutes/findRoutes';
import * as RootNavigation from '../navigation/rootNavigation';
import appRoutes from '../navigation/appRoutes';
import { horizontalPadding, lowGray, primaryColor } from '../utils/const';

const Search = ({ active }) => {
  const routesToDisplaySearchComponent = [findRoutes.HOME_FEED, findRoutes.MAP_VIEW];
  let currentRoute;

  if (RootNavigation.navigationRef.getCurrentRoute()?.name === appRoutes.TAB_NAVIGATOR) {
    currentRoute = findRoutes.HOME_FEED;
  } else {
    currentRoute = RootNavigation.navigationRef.getCurrentRoute()?.name as findRoutes;
  }

  const handleToggle = () => {
    active = !active;
    const targetedRoute = active ? findRoutes.MAP_VIEW : findRoutes.HOME_FEED;
    RootNavigation.navigate(targetedRoute, {});
  };

  if (!routesToDisplaySearchComponent.includes(currentRoute)) {
    return null;
  }

  return (
    <View style={Platform.OS === 'ios' ? styles.wrapperIos : styles.wrapperAndroid}>
      <TextInput
        placeholder="Lille"
        mode={'flat'}
        activeOutlineColor={`${primaryColor}`}
        outlineColor={`${lowGray}`}
        selectionColor={`${primaryColor}`}
        underlineColor="transparent"
        style={{
          width: '80%',
          height: 30,
          borderRadius: 4,
        }}
        theme={{
          colors: {
            primary: `transparent`,
          },
        }}
      />
      <Switch
        onValueChange={handleToggle}
        value={active}
        color={primaryColor}
        style={{ height: 30, width: '20%' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapperIos: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  wrapperAndroid: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingLeft: horizontalPadding / 2,
    paddingRight: horizontalPadding / 2,
    paddingBottom: horizontalPadding / 2,
    paddingTop: horizontalPadding / 2,
    backgroundColor: '#fff',
  },
});

export default Search;
