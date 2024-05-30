import {
    View,
    Text,
    StyleSheet,
    Image,
    SafeAreaView,
    TouchableOpacity,
    Modal,
    Dimensions,
    StatusBar
  } from "react-native";
  import React, { useState, useEffect } from "react";

  import AsyncStorage from "@react-native-async-storage/async-storage";

  import { useNavigation } from "@react-navigation/native";

  import axios from "axios";
  import { useLogin } from "../context/LoginProvider";


const ProfileScreen = () => {
  const [user, setUser] = useState('');
  const navigation = useNavigation();
  const { login, logout, isLoggedIn } = useLogin();

  // Hent username
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem("username");
        if (storedUsername) {
          setUser(storedUsername);
        }
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };

    fetchUsername();
  }, []);

  const logoutHandle = async () => {
    try {
      await AsyncStorage.removeItem("access_token");
      logout();
      navigation.navigate("LoginRegisterScreen");
    } catch (error) {
      console.error(error);
    }
  };


  return(
    <>
    <StatusBar style="dark" />
    <SafeAreaView style={styles.safeAreaViewContainer}>
    <View style={styles.mainContainer}>
      <View>
        <Text>Hey {user}</Text>
      </View>

      <View style={styles.logoutButtonContainer}>
            <TouchableOpacity onPress={logoutHandle} style={styles.loginButton}>
              <Text style={styles.textLoginButton}>Log out</Text>
            </TouchableOpacity>
          </View>
    </View>
    </SafeAreaView>
    </>
  )
}

export default ProfileScreen;

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
    backgroundColor: "f4f4f4",
  },
  mainContainer: {
    paddingTop: 50,
    paddingLeft: 35,
    paddingRight: 35,
  },
  logoutButtonContainer: {
    marginTop: 10,
  },
  loginButton: {
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "green",
  },
  textLoginButton: {
    textTransform: "uppercase",
    textAlign: "center",
    color: "green",
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontWeight: "bold",
  },

});