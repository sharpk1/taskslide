import React, {useState} from 'react';
import {View, TextInput, Button, Alert} from 'react-native';

const PhoneRegistrationScreen = () => {
  const [countryCode, setCountryCode] = useState('+1');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = () => {
    // Implement registration logic here
    Alert.alert(`Registering with ${countryCode} ${phoneNumber}`);
  };

  return (
    <View>
      <TextInput
        placeholder="Country Code"
        value={countryCode}
        onChangeText={setCountryCode}
        keyboardType="number-pad"
      />
      <TextInput
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="number-pad"
      />
      <Button title="Next" onPress={handleSubmit} />
    </View>
  );
};

export default PhoneRegistrationScreen;
