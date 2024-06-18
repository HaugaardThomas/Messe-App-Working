import React, { useEffect, useContext } from "react";
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from "./navigation/TabNavigator";
import { LoginProvider, useLogin } from './context/LoginProvider';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeProvider, ThemeContext } from './context/ThemeContext';


export default function App() {
  return (
    <LoginProvider>
      <ThemeProvider>
      <AppContent />
      </ThemeProvider>
    </LoginProvider>
  );
}

function AppContent() {
  const { login } = useLogin();
  const { theme } = useContext(ThemeContext);

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
    <NavigationContainer theme={{ colors: { background: theme.backgroundColor } }}>
      <TabNavigator />
    </NavigationContainer>
  );
}
