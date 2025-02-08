// blinderz/src/screens/SplashScreen.tsx
import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

interface SplashScreenProps {
  onFinish: () => void; // Callback to signal that the splash is done
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  // When the component mounts, set a timer to call onFinish after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* Display your logo from the assets folder */}
      <Image source={require('../../assets/Splash_logo.png')} style={styles.logo} />
      <Text style={styles.tagline}>Discover Genuine Connections</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Neutral background
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  tagline: {
    fontSize: 18,
    color: '#333333',
  },
});

export default SplashScreen;
