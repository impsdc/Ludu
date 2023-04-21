import * as React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

interface IlinkTab {
  icon: string;
  label: string;
  value?: string;
}
const LinkTab = ({ icon, label, value }: IlinkTab) => {
  return (
    <View style={{ marginVertical: 16 }}>
      <View
        style={{
          width: 200,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text variant="bodyMedium">Username</Text>
        <Text variant="bodyLarge" style={{ fontWeight: 'bold', textAlign: 'center' }}>
          Paul
        </Text>
      </View>
    </View>
  );
};

export default LinkTab;
