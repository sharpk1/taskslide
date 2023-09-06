import React, {useState, useRef, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Text,
  Animated,
} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const PhoneRegistrationScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  const [value, setValue] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [valid, setValid] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const phoneInput = useRef<PhoneInput>(null);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000, // Duration in milliseconds
      useNativeDriver: true, // Add this line
    }).start();
  }, [fadeAnim]);
  return (
    <>
      <Animated.View style={{...styles.container, opacity: fadeAnim}}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.container}>
          <SafeAreaView style={styles.wrapper}>
            {showMessage && (
              <View style={styles.message}>
                <Text>Country Code : {countryCode}</Text>
                <Text>Value : {value}</Text>
                <Text>Formatted Value : {formattedValue}</Text>
                <Text>Valid : {valid ? 'true' : 'false'}</Text>
              </View>
            )}
            <PhoneInput
              containerStyle={{borderRadius: 10}}
              textContainerStyle={{borderRadius: 10}}
              ref={phoneInput}
              defaultValue={value}
              defaultCode="US"
              layout="first"
              onChangeText={text => {
                setValue(text);
              }}
              onChangeFormattedText={text => {
                setFormattedValue(text);
                setCountryCode(phoneInput.current?.getCountryCode() || '');
              }}
              countryPickerProps={{withAlphaFilter: true}}
              disabled={disabled}
              withDarkTheme
              withShadow
              autoFocus
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                const checkValid = phoneInput.current?.isValidNumber(value);
                setShowMessage(true);
                setValid(checkValid ? checkValid : false);
                setCountryCode(phoneInput.current?.getCountryCode() || '');
                let getNumberAfterPossiblyEliminatingZero =
                  phoneInput.current?.getNumberAfterPossiblyEliminatingZero();
                console.log(getNumberAfterPossiblyEliminatingZero);
              }}>
              <Text style={styles.buttonText}>Send Code</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={[styles.button, disabled ? {} : styles.redColor]}
              onPress={() => {
                setDisabled(!disabled);
              }}>
              <Text style={styles.buttonText}>
                {disabled ? 'Activate' : 'Disable'}
              </Text>
            </TouchableOpacity> */}
          </SafeAreaView>
        </View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lighter,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderRadius: 10,
    marginTop: 20,
    height: 50,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    shadowColor: 'rgba(0,0,0,0.4)',
    shadowOffset: {
      width: 1,
      height: 5,
    },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  redColor: {
    backgroundColor: '#F57777',
  },
  message: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 20,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

export default PhoneRegistrationScreen;
