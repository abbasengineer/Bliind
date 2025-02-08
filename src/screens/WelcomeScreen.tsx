// blinderz/src/screens/WelcomeScreen.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

interface WelcomeScreenProps {
  onGetStarted: () => void; // Callback to trigger navigation to the next step
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onGetStarted }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Blynd</Text>
      <Text style={styles.subtitle}>
        Discover connections built on genuine compatibility—where personality comes first.
      </Text>
      <Button title="Get Started" onPress={onGetStarted} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default WelcomeScreen;
