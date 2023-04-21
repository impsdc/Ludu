import React, { useCallback } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Filter from '../../components/Filter';
import Layout from '../Layout';
import CardItem from '../booking/Card';
import { useGetUserRentsQuery } from '../../services/LUDU_API/rents';
import { FilterTypes } from '../../models/Filter';
import { useSelector } from 'react-redux';
import { MainAppState } from '../../models/states';
import { Rent } from '../../models/states/Rent';
import { primaryColor } from '../../utils/const';
import bookingRoute from '../../navigation/appRoutes/bookingRoutes';
import { useFocusEffect } from '@react-navigation/native';
import NotFound from '../../components/NotFound';

const BookingTabsScreen = ({ navigation }) => {
  const userLogged = useSelector((state: MainAppState) => state.user);
  const filterStatus = useSelector((state: MainAppState) => state.filterBookingsByStatus);
  const getParams = () => {
    const params = { _id: userLogged.id };
    if (!filterStatus.filters.length) {
      return params;
    }
    return {
      ...params,
      status: filterStatus.filters.join(),
    };
  };
  const {
    data: rents,
    refetch: refetchRents,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useGetUserRentsQuery(getParams(), {
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  if (isError) {
    console.log(error);
  }

  useFocusEffect(
    useCallback(() => {
      refetchRents();
    }, [refetchRents]),
  );

  return (
    <>
      {isLoading && (
        <View style={styles.center}>
          <ActivityIndicator animating={true} size="large" color={primaryColor} />
        </View>
      )}
      <Layout>
        {isSuccess && (
          <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 14 }}>
            <>
              {rents.length === 0 ? (
                <View
                  style={{
                    height: Dimensions.get('window').height,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <NotFound info={`No bookings yet`} />
                  {filterStatus.active ? <Filter filterType={FilterTypes.Status} /> : ''}
                </View>
              ) : (
                <>
                  {rents.map((rent: Rent, index) => {
                    if (rent.endDate === null) {
                      return (
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate(bookingRoute.BOOKING_ACTION_SCREEN, {
                              rent,
                            })
                          }
                          key={index}
                        >
                          <CardItem rent={rent} isAction={true} />
                        </TouchableOpacity>
                      );
                    } else {
                      return (
                        <View key={index}>
                          <CardItem rent={rent} isAction={true} />
                        </View>
                      );
                    }
                  })}
                  {filterStatus.active ? <Filter filterType={FilterTypes.Status} /> : ''}
                </>
              )}
            </>
          </ScrollView>
        )}
      </Layout>
    </>
  );
};

const styles = StyleSheet.create({
  center: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    height: '100%',
  },
});

export default BookingTabsScreen;
