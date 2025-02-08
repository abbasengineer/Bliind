// blinderz/src/screens/ProfileSetupScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

const ProfileSetupScreen: React.FC = () => {
  // State variables for profile fields.
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);

  // Request permissions when the screen mounts.
  useEffect(() => {
    (async () => {
      // Request location permission.
      const { status: locStatus } = await Location.requestForegroundPermissionsAsync();
      if (locStatus !== 'granted') {
        Alert.alert('Permission needed', 'Location permission was denied.');
      }
      // Request camera permission.
      const { status: camStatus } = await ImagePicker.requestCameraPermissionsAsync();
      if (camStatus !== 'granted') {
        Alert.alert('Permission needed', 'Camera permission was denied.');
      }
    })();
  }, []);

  // Function to get the current location.
  const fetchLocation = async () => {
    try {
      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    } catch (error) {
      Alert.alert('Error', 'Could not fetch location.');
    }
  };

  // Function to launch the camera for a verification photo.
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });
      if (!result.canceled) {
        setPhoto(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Could not open camera.');
    }
  };

  // Function to save profile details (for now, just logs to console).
  const handleSaveProfile = () => {
    console.log('Profile Saved:', { age, gender, location, photo });
    Alert.alert('Profile Saved', 'Your profile details have been logged.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile Setup</Text>
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Gender"
        value={gender}
        onChangeText={setGender}
      />
      <Button title="Get Current Location" onPress={fetchLocation} />
      {location && (
        <Text style={styles.locationText}>
          {`Lat: ${location.latitude.toFixed(4)}, Lon: ${location.longitude.toFixed(4)}`}
        </Text>
      )}
      <Button title="Take Verification Photo" onPress={pickImage} />
      {photo && <Image source={{ uri: photo }} style={styles.photo} />}
      <Button title="Save Profile" onPress={handleSaveProfile} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#FFF',
  },
  locationText: {
    textAlign: 'center',
    marginBottom: 15,
    color: '#333',
  },
  photo: {
    width: 200,
    height: 200,
    marginVertical: 10,
    alignSelf: 'center',
  },
});

export default ProfileSetupScreen;
