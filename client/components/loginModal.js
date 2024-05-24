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

// Images
import arrowCloseButton from "../assets/images/Arrow_close_button.png";

const { width } = Dimensions.get("window");


const LoginModal = ({ modalLoginVisible, setModalLoginVisible }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  const navigation = useNavigation();


  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/users/login",
        {
          username,
          password,
        }
      );

      setModalLoginVisible(false);
      navigation.navigate("HomeScreen");
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
