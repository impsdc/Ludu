import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Dimensions, StyleSheet, View } from 'react-native';
import { MainAppState } from '../../models/states';
import { useSelector } from 'react-redux';
import { useGetEntitiesByZipCodeQuery } from '../../services/LUDU_API/locations';
import { getLatLongFromAddress } from '../../services/geocodingService';

const MapViewScreen = () => {
  const currentLocation = useSelector((state: MainAppState) => state.currentLocation);

  const zipCode = useSelector((state: MainAppState) => state.currentLocation.zipCode);
  const { data, isSuccess, isError, error } = useGetEntitiesByZipCodeQuery({
    postalCode: zipCode,
    entity: 'stores',
    filteredCategories: [],
  });
  const [stores, setStores] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const storesWithCoords = await Promise.all(
        data.map(async (store) => {
          const coords = await getLatLongFromAddress(store.address);
          return { ...store, coords };
        }),
      );

      setStores(storesWithCoords);
    }

    if (isSuccess) {
      fetchData();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) console.log(error);
  }, [isError]);
  if (stores) {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {stores.map(
            (marker, index) =>
              marker.coords && (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: marker.coords.lat,
                    longitude: marker.coords.lng,
                  }}
                  title={marker.name}
                />
              ),
          )}
        </MapView>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default MapViewScreen;
