import React, { useState, useEffect, useContext } from "react";
import {
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
import Modal from 'react-native-modal';

import axios from "axios";

import { useNavigation } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";

// Images
import arrowCloseButton from "../assets/images/Arrow_close_button.png";

// CONTEXT
import { ThemeContext } from "../context/ThemeContext";
import { useLogin } from "../context/LoginProvider";

 // ICONS 
 import { Ionicons } from '@expo/vector-icons';


const { width } = Dimensions.get("window");


const LoginModal = ({ modalLoginVisible, setModalLoginVisible }) => {
    // DARKMODE
    const { theme, toggleTheme } = useContext(ThemeContext);
    
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
      await AsyncStorage.setItem("userID", response.data.userID);
      await AsyncStorage.setItem("username", response.data.username);

      await AsyncStorage.getItem('theme');
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
    animationIn="slideInRight"
    animationInTiming={800}
    animationOut="slideOutRight"
    animationOutTiming={800}
    backdropTransitionInTiming={800}
    backdropTransitionOutTiming={800}
    swipeDirection="right"
      onSwipeComplete={() => setModalLoginVisible(false)}
         isVisible={modalLoginVisible}
      onRequestClose={() => {
        setModalLoginVisible(!modalLoginVisible);
      }}
      style={styles.cardModal}
    >
             <View style={[styles.centeredView, {backgroundColor: theme.backgroundColor}]}>
             <View style={[styles.modalView, {backgroundColor: theme.backgroundColor}]}>

          <View style={styles.goBackContainer}>
            <TouchableOpacity onPress={() => setModalLoginVisible(!modalLoginVisible)}>
            <Ionicons  name="chevron-back" size={28} color={theme.textColor} />
            </TouchableOpacity>
          </View>

          <View style={styles.registerModalFormContainer}>
            <Text style={[styles.title, {color: theme.textColor}]}>Login</Text>

            <TextInput
              style={[styles.input, {borderColor: theme.textColor, color: theme.textColor}]}
              placeholder="Username"
              placeholderTextColor="#A9A9A9"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />

            <TextInput
                 style={[styles.input, {borderColor: theme.textColor, color: theme.textColor}]}
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
   // Modal
   cardModal: {
    margin: 0, 
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: '100%',
    height: '100%',
    padding: 35,
    paddingTop: 100,
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
