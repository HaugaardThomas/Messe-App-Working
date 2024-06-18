// ThemeContext.js
import React, { createContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext();

const lightTheme = {
  backgroundColor: '#FFFFFF',
  subBackgroundColor: '#F4F4F4',
  textColor: '#000000',
  switchTrackColor: '#767577',
  switchThumbColor: '#f4f3f4',
  iconColor: 'black',
};

const darkTheme = {
  backgroundColor: '#121212',
  subBackgroundColor: '#333333',
  textColor: '#FFFFFF',
  switchTrackColor: '#4BB543',
  switchThumbColor: '#f4f3f4',
  iconColor: 'white',
};

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState(systemColorScheme === 'dark' ? 'dark' : 'light');

  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await AsyncStorage.getItem('theme');
      if (storedTheme) {
        setTheme(storedTheme);
      } else {
        setTheme(systemColorScheme === 'dark' ? 'dark' : 'light');
      }
    };
    loadTheme();
  }, [systemColorScheme]);

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    await AsyncStorage.setItem('theme', newTheme);
  };

  const currentTheme = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
