import React, { useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from "./navigation/TabNavigator";
import { LoginProvider, useLogin } from './context/LoginProvider';
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function App() {
  return (
    <LoginProvider>
      <AppContent />
    </LoginProvider>
  );
}

function AppContent() {
  const { login } = useLogin();

  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = await AsyncStorage.getItem("access_token");
      if (token) {
        login();
      }
    };

    checkLoggedIn();
  }, [login]);

  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}
