import { View, Text, StyleSheet, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";

// Navigation
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Login Auth/Provider
import { useLogin } from "../context/LoginProvider";

// Screens
import HomeScreen from "../screens/HomeScreen";
import StandScreen from "../screens/StandScreen";
import KortScreen from "../screens/KortScreen";
import ProfileScreen from "../screens/ProfileScreen";
import LoginScreen from "../screens/LoginScreen";

// Colors
import Colors from "../colors/Colors";

// AsyncStorage
import AsyncStorage from "@react-native-async-storage/async-storage";

// Icon
import { AntDesign, Ionicons, Feather } from '@expo/vector-icons';



const TabNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <>
      <StatusBar style="dark" />

      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: '#02020A',
            height: 60,
            paddingBottom: 5,
            position: 'absolute',
            marginBottom: 30,
            marginRight: 35,
            marginLeft: 35,
            borderRadius: 50,
            elevation: 0, // for Android shadow
          },
        }}
      >
        <Tab.Screen name="HomeScreen" component={HomeScreen}
            options={{
             headerShown: false, // fjerner header
              tabBarIcon: ({ focused, color, size }) => (
                <View style={focused ? styles.iconBackground : {}}>
                <AntDesign name="home" size={22} color="white" 
                style={styles.tabIcon}
                />
                </View>
              ),
            }}
            
        />
        <Tab.Screen name="StandScreen" component={StandScreen} 
        options={{
                headerShown: false, // fjerner header
          tabBarIcon: ({ focused, color, size }) => (
            <View style={focused ? styles.iconBackground : {}}>
            <AntDesign name="scan1" size={22} color="white" 
            style={styles.tabIcon}
            />
            </View>
          ),
        }}
        />
        <Tab.Screen name="KortScreen" component={KortScreen} 
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
              <View style={focused ? styles.iconBackground : {}}>
                 <Ionicons name="map-outline" size={22} color="white"
                style={styles.tabIcon}
                />
                </View>
          ),
        }}
        />
         <Tab.Screen name="ProfileScreen" component={ProfileScreen} 
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
              <View style={focused ? styles.iconBackground : {}}>
                 <Feather name="user" size={22} color="white"
                style={styles.tabIcon}
                />
                </View>
          ),
        }}
        />
        <Tab.Screen name="LoginScreen" component={LoginScreen} 
        options={{ 
          tabBarButton: () => null,
          tabBarVisible: false,
          headerShown: false,
          }} 
          />
      </Tab.Navigator>

   
    </>
  );
};

export default TabNavigator;


const styles = StyleSheet.create({
  tabIcon: {
    zIndex: 3,
  },
  iconBackground: {
    width: 40,
    height: 40, 
    borderRadius: 50, 
    backgroundColor: '#474954', 
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});