// blinderz/src/screens/AuthScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import { firebase } from '../firebase/firebaseConfig'; // Using compat version

// Define the prop types to include onAuthSuccess
interface AuthScreenProps {
  onAuthSuccess: () => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onAuthSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
  };

  const handleAuth = async () => {
    if (isSignUp) {
      try {
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
        console.log('User signed up:', userCredential.user);
        // Optionally update the user profile with the name here.
        onAuthSuccess(); // Call onAuthSuccess after a successful sign-up
      } catch (error: any) {
        console.error('Sign Up Error:', error.message);
        Alert.alert('Sign Up Error', error.message);
      }
    } else {
      try {
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
        console.log('User signed in:', userCredential.user);
        onAuthSuccess(); // Call onAuthSuccess after a successful sign-in
      } catch (error: any) {
        console.error('Sign In Error:', error.message);
        Alert.alert('Sign In Error', error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{isSignUp ? 'Sign Up' : 'Sign In'}</Text>
      {isSignUp && (
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title={isSignUp ? 'Sign Up' : 'Sign In'} onPress={handleAuth} />
      <TouchableOpacity onPress={toggleAuthMode}>
        <Text style={styles.toggleText}>
          {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
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
  toggleText: {
    color: '#007BFF',
    textAlign: 'center',
    marginTop: 15,
    fontSize: 16,
  },
});

export default AuthScreen;
