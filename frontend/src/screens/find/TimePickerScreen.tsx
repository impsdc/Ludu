import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import findRoutes from '../../navigation/appRoutes/findRoutes';
import { primaryColor } from '../../utils/const';
import Layout from '../Layout';
import { useSelector } from 'react-redux';
import { MainAppState } from '../../models/states';
import { useCreateRentMutation } from '../../services/LUDU_API/rents';
import { RentType } from '../../models/states/Rent';

function TimePickerScreen({ route, navigation }: any) {
  const game = route.params.game;
  const store = route.params.selectedStore;
  const [date, setDate] = useState(new Date());
  const onChange = (event, selectedDate) => {
    if (event?.type === 'dismissed') {
      setDate(date);
      return;
    }
    setDate(selectedDate);
  };

  const deliveryTime = new Date(date);
  const hoursToAdd = 2;
  deliveryTime.setUTCHours(deliveryTime.getUTCHours() + hoursToAdd);
  const user = useSelector((state: MainAppState) => state.user);
  const [createRent, { isError }] = useCreateRentMutation();

  const handleSubmit = () => {
    const formData = {
      startDate: deliveryTime,
      game: store.copies[0]._id,
      owner_id: store._id,
      user: user.id,
      type: RentType.HOME,
    };
    createRent(formData)
      .unwrap()
      .then((res) => {
        handleNavigation(res);
      })
      .catch((error) => {
        if (isError) {
          console.log(error.data);
        }
      });
  };

  const handleNavigation = (response) => {
    navigation.navigate(findRoutes.BOOKING_CONFIRMATION, {
      game: game,
      store: store,
      response: response,
    });
  };
  return (
    <Layout>
      <View style={{ height: '100%', alignItems: 'center' }}>
        <View style={{ marginTop: 70 }}>
          <View
            style={{
              paddingHorizontal: 8,
              alignItems: 'center',
              paddingTop: 5,
            }}
          >
            <Text variant="headlineMedium" style={{ fontWeight: 'bold' }}>
              Booking for: {game.name}
            </Text>
            <Text variant="bodyLarge">
              at{' '}
              <Text style={{ fontWeight: 'bold' }}>
                {store.name} <Text style={{ fontWeight: 'bold' }}>today</Text>
              </Text>
            </Text>
          </View>

          <View style={{ marginTop: 80 }}>
            <Text>When do you want us to bring you the game?</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 40 }}>
          <View style={{ marginRight: 10 }}>
            <Text variant="bodyLarge">Chosen time:</Text>
          </View>
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="time"
            display="default"
            onChange={onChange}
          />
        </View>
        <Button
          style={[styles.btn]}
          buttonColor={primaryColor}
          textColor="white"
          onPress={() => handleSubmit()}
        >
          Continue
        </Button>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    marginTop: 20,
  },
  btn: {
    borderRadius: 5,
    width: 'auto',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  buttonActive: {
    backgroundColor: '#000000',
  },
  textActive: {
    color: 'white',
  },
});

export default TimePickerScreen;
