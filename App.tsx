import React, { useState, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import SplashScreenComponent from './src/screens/SplashScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import AuthScreen from './src/screens/AuthScreen';

type Screen = 'splash' | 'welcome' | 'auth';

SplashScreen.preventAutoHideAsync();

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');

  useEffect(() => {
    setTimeout(async () => {
      console.log("Hiding splash screen...");
      await SplashScreen.hideAsync();
    }, 1000);
  }, []);

  const handleSplashFinish = () => {
    console.log("Splash finished → Moving to Welcome");
    setCurrentScreen('welcome');
  };

  const handleGetStarted = () => {
    console.log("Welcome Screen → Moving to Auth");
    setCurrentScreen('auth');
  };

  const handleAuthSuccess = () => {
    console.log("Auth successful → (Profile setup will be next)");
  };

  switch (currentScreen) {
    case 'splash':
      return <SplashScreenComponent onFinish={handleSplashFinish} />;
    case 'welcome':
      return <WelcomeScreen onGetStarted={handleGetStarted} />;
    case 'auth':
      return <AuthScreen onAuthSuccess={handleAuthSuccess} />; // ✅ Add auth screen
    default:
      return null;
  }
};

export default App;
