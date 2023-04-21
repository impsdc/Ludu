import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import findRoutes from '../../navigation/appRoutes/findRoutes';
import StoreListing from '../../components/StoreListing';
import { primaryColor } from '../../utils/const';
import Layout from '../Layout';
import { useSelector } from 'react-redux';
import { MainAppState } from '../../models/states';
import { useGetEntitiesByZipCodeQuery } from '../../services/LUDU_API/locations';

function StorePickScreen({ route, navigation }: any) {
  const item = route.params.game;
  const zipCode = useSelector((state: MainAppState) => state.currentLocation.zipCode);
  const { data, isSuccess } = useGetEntitiesByZipCodeQuery(
    {
      postalCode: zipCode,
      entity: 'stores',
      filteredCategories: [],
    },
    { refetchOnMountOrArgChange: true },
  );

  const [stores, setStores] = React.useState([]);

  React.useEffect(() => {
    if (isSuccess) {
      setStores(data);
    }
  }, [isSuccess]);
  const filterStore = (store) => {
    return store.copies.some((copy) => copy.game[0]._id === item._id && copy.available);
  };

  const gamePlaces = stores.filter((store) => filterStore(store));
  const [selected, setSelected] = useState(null);
  const selectedGame = (it) => {
    setSelected(it);
  };

  const handleNavigation = () => {
    if (selected) {
      navigation.navigate(findRoutes.TIME_FEED, {
        selectedStore: selected,
        game: item,
      });
    } else {
      return '';
    }
  };

  return (
    <Layout>
      <View
        style={{
          height: '100%',
          justifyContent: 'space-between',
          paddingVertical: 70,
          paddingHorizontal: 15,
        }}
      >
        <View>
          <Text variant="headlineMedium" style={{ fontWeight: 'bold', textAlign: 'center' }}>
            Play {item.name} today
          </Text>
          <Text variant="titleSmall" style={{ textAlign: 'center' }}>
            Game stores based on your current location
          </Text>
        </View>
        <View>
          <Text variant="headlineSmall" style={{ fontWeight: 'bold', textAlign: 'center' }}>
            Game availability in your area:
          </Text>
          <ScrollView style={{ paddingVertical: 20, height: 300 }}>
            <StoreListing selectedStore={selectedGame} items={gamePlaces} />
          </ScrollView>
        </View>
        <Button
          buttonColor={primaryColor}
          textColor="white"
          style={{ borderRadius: 5, width: 'auto' }}
          onTouchEnd={() => handleNavigation()}
        >
          Continue
        </Button>
      </View>
    </Layout>
  );
}

export default StorePickScreen;
