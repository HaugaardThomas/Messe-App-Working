import { View, Text, StyleSheet, Image } from "react-native";
import React, { useState, useEffect } from "react";

// Navigation
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Login Auth/Provider
import { useLogin } from "../context/LoginProvider";

// Screens
import HomeScreen from "../screens/HomeScreen";
import StandScreen from "../screens/StandScreen";
import VirksomhederScreen from "../screens/VirksomhederScreen";
import LoginRegisterScreen from "../screens/LoginRegisterScreen";
import ProfileScreen from "../screens/ProfileScreen";
import BookStandScreen from "../screens/BookStandScreen";
import ProgramScreen from "../screens/ProgramScreen";
import BookedeMeetingsScreen from "../screens/BookedeMeetingsScreen";

import ProfileScreen2 from "../screens/ProfileScreen2";

import ProfileScreen3 from "../screens/ProfileScreen3";

// Colors
import Colors from "../colors/Colors";

// AsyncStorage
import AsyncStorage from "@react-native-async-storage/async-storage";

// Icon
import { AntDesign, Ionicons, Feather } from "@expo/vector-icons";

// MODAL
import CalendarModal from "../components/calendarModal";
import BookMeetingModal from "../components/bookMeetingModal";

const TabNavigator = () => {
  const { login, isLoggedIn } = useLogin();
  const Tab = createBottomTabNavigator();

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#02020A",
            height: 60,
            paddingBottom: 5,
            position: "absolute",
            marginBottom: 30,
            marginRight: 35,
            marginLeft: 35,
            borderRadius: 50,
            elevation: 0, // for Android shadow
          },
        }}
      >
        <Tab.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            headerShown: false, // fjerner header
            tabBarIcon: ({ focused, color, size }) => (
              <View style={focused ? styles.iconBackground : {}}>
                <AntDesign
                  name="home"
                  size={22}
                  color="white"
                  style={styles.tabIcon}
                />
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="StandScreen"
          component={StandScreen}
          options={{
            headerShown: false, // fjerner header
            tabBarIcon: ({ focused, color, size }) => (
              <View style={focused ? styles.iconBackground : {}}>
                <AntDesign
                  name="scan1"
                  size={22}
                  color="white"
                  style={styles.tabIcon}
                />
              </View>
            ),
          }}
        />

        {/* <Tab.Screen name="ProfileScreen2" component={ProfileScreen2}
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
          /> */}

        {isLoggedIn ? (
          <>
            <Tab.Screen
              name="VirksomhederScreen"
              component={VirksomhederScreen}
              options={{
                headerShown: false,
                tabBarButton: () => null,
                tabBarIcon: ({ focused }) => (
                  <View style={focused ? styles.iconBackground : {}}>
                    <AntDesign
                      name="calendar"
                      size={22}
                      color="white"
                      style={styles.tabIcon}
                    />
                  </View>
                ),
              }}
            />
                 <Tab.Screen
              name="ProgramScreen"
              component={ProgramScreen}
              options={{
                headerShown: false,
                tabBarButton: () => null,
                tabBarIcon: ({ focused }) => (
                  <View style={focused ? styles.iconBackground : {}}>
                    <AntDesign
                      name="calendar"
                      size={22}
                      color="white"
                      style={styles.tabIcon}
                    />
                  </View>
                ),
              }}
            />

            {/* <Tab.Screen
              name="ProfileScreen"
              component={ProfileScreen}
              options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                  <View style={focused ? styles.iconBackground : {}}>
                    <Feather
                      name="user"
                      size={22}
                      color="white"
                      style={styles.tabIcon}
                    />
                  </View>
                ),
              }}
            /> */}

            <Tab.Screen
              name="BookedeMeetingsScreen"
              component={BookedeMeetingsScreen}
              options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                  <View style={focused ? styles.iconBackground : {}}>
                   <AntDesign 
                   name="calendar" 
                   size={22}
                   color="white"
                   style={styles.tabIcon} 
                   />
                  </View>
                ),
              }}
            />

            <Tab.Screen
              name="ProfileScreen3"
              component={ProfileScreen3}
              options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                  <View style={focused ? styles.iconBackground : {}}>
                    <Feather
                      name="user"
                      size={22}
                      color="white"
                      style={styles.tabIcon}
                    />
                  </View>
                ),
              }}
            />

          </>
        ) : (
          <Tab.Screen
            name="LoginRegisterScreen"
            component={LoginRegisterScreen}
            options={{
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <View style={focused ? styles.iconBackground : {}}>
                  <Feather
                    name="user"
                    size={22}
                    color="white"
                    style={styles.tabIcon}
                  />
                </View>
              ),
            }}
          />
        )}

        <Tab.Screen
          name="BookStandScreen"
          component={BookStandScreen}
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
    backgroundColor: "#474954",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
});
