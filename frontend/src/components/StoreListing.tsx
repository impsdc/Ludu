import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import { secondaryColor } from '../utils/const';

const StoreListing = ({ items, selectedStore }: any) => {
  const [itemSelected, updateItemSelected] = useState([]);
  useEffect(() => {
    selectedStore(itemSelected[0]);
  }, [itemSelected]);
  const handleItemSelected = (filter: any, id) => {
    itemSelected.push(filter);
    updateItemSelected([...itemSelected]);
    updateItemSelected(itemSelected.filter((it) => it?._id === id));
  };

  return (
    <View style={{ paddingVertical: 6 }}>
      <View style={{ justifyContent: 'space-between' }}>
        {/* <Avatar
                                    size="48px"
                                    source={{
                                        uri: item.avatarUrl,
                                    }}
                                /> */}
        {items.map((item, index) => (
          <View key={index.toString()} style={{ margin: 4, paddingVertical: 8 }}>
            <TouchableOpacity
              onPress={() => handleItemSelected(item, item._id)}
              style={itemSelected[0]?._id === item._id ? styles.listPress : styles.list}
            >
              <Text style={itemSelected[0]?._id === item._id ? styles.textPress : styles.text}>
                {item.name}
              </Text>
              <Text style={itemSelected[0]?._id === item._id ? styles.cityPress : styles.city}>
                {item.address}
              </Text>

              <Text style={itemSelected[0]?._id === item._id ? styles.ownerPress : styles.owner}>
                Owner: {item.owner}
              </Text>
            </TouchableOpacity>
            <Divider style={{ marginTop: 5 }} />
          </View>
        ))}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  list: {
    backgroundColor: 'transparent',
  },
  listPress: {
    backgroundColor: secondaryColor,
    borderRadius: 6,
    padding: 12,
  },
  textPress: {
    color: '#fff',
    fontWeight: 'bold',
  },

  text: {
    color: 'black',
    fontWeight: 'bold',
  },

  cityPress: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 20,
    fontStyle: 'italic',
    fontSize: 14,
  },

  city: {
    color: 'black',
    fontWeight: 'bold',
    marginTop: 20,
    fontStyle: 'italic',
    fontSize: 14,
  },
  ownerPress: {
    color: '#fff',
    marginTop: 20,
    fontStyle: 'italic',
    fontSize: 14,
  },

  owner: {
    color: 'black',
    marginTop: 20,
    fontStyle: 'italic',
    fontSize: 14,
  },
});
export default StoreListing;
