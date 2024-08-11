import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { TamaguiProvider } from 'tamagui';

import SignIn from './(auth)/sign-in';
import config from '../tamagui.config';

export default function Layout() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <TamaguiProvider config={config}>
      {isLoggedIn ? (
        <Stack
          initialRouteName="index"
          screenOptions={{
            headerShown: false,
          }}
        />
      ) : (
        <SignIn onLoginSuccess={() => setIsLoggedIn(true)} />
      )}
    </TamaguiProvider>
  );
}
