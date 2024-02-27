import React from 'react';
import { View, Text } from 'react-native';

const MainScreen = ({ route }) => {
  const { firstName, isVerified } = route.params;
  console.log('First Name:', firstName);
  const firstNames = firstName.map((name) => name.value).join(', ');

  return (
    <View>
      {isVerified ? (
        <Text>Pershendetje: {firstNames}. Ju jeni verifikuar me sukses. Pas 6 muajve duhet te verifikoheni perseri!!</Text>
      ) : null}
      <Text>Verification Status: {isVerified ? 'Verified' : 'Not Verified'}</Text>
    </View>
  );
};

export default MainScreen;
