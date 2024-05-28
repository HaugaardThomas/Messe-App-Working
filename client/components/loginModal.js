import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  TextInput,
  Button,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
} from "react-native";

import axios from "axios";

import { useNavigation } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";

// Images
import arrowCloseButton from "../assets/images/Arrow_close_button.png";

import { useLogin } from "../context/LoginProvider";

const { width } = Dimensions.get("window");


const LoginModal = ({ modalLoginVisible, setModalLoginVisible }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const { login, isLoggedIn } = useLogin();

  const [error, setError] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    console.log("Is Logged In:", isLoggedIn); // Log the value of isLoggedIn
    if (isLoggedIn) {
      // If user is already logged in, navigate them to ProfileScreen
      navigation.navigate("ProfileScreen");
    }
  }, [isLoggedIn, navigation]);


  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://messe-app-server.onrender.com/users/login",
        {
          username,
          password,
        }
      );

      // Gem user 
      await AsyncStorage.setItem("access_token", response.data.token);
      await AsyncStorage.setItem("userID", response.data.userID.toString());
      await AsyncStorage.setItem("username", response.data.username);

      login();

      setModalLoginVisible(false);
      navigation.navigate("ProfileScreen");
    } catch (error) {
      if (error.response.status === 401) {
        setError(error.response.data.message);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalLoginVisible}
      onRequestClose={() => {
        setModalLoginVisible(!modalLoginVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={() => setModalLoginVisible(!modalLoginVisible)}
          >
            <Image source={arrowCloseButton} />
          </TouchableOpacity>

          <View style={styles.registerModalFormContainer}>
            <Text style={styles.title}>Register</Text>

            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#A9A9A9"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#A9A9A9"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />

            <Button title="Login" onPress={handleLogin} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LoginModal;

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.91,
    marginTop: 45,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalCloseButton: {
    position: "absolute",
    left: 10,
    top: 10,
    borderRadius: 20,
    padding: 5,
    elevation: 2,
    backgroundColor: "black",
  },
  registerModalFormContainer: {
    marginTop: 200,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
