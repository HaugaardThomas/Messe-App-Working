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

// Images
import arrowCloseButton from "../assets/images/Arrow_close_button.png";

const { width } = Dimensions.get("window");

const Notification = ({ message, duration = 3000, onHide }) => {
  const [translateY] = useState(new Animated.Value(-100));

  useEffect(() => {
    // Slide down animation
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
    }).start();

    // Slide up and hide after `duration` milliseconds
    const timer = setTimeout(() => {
      Animated.timing(translateY, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        onHide();
      });
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onHide, translateY]);

  return (
    <Animated.View style={[styles.notification, { transform: [{ translateY }] }]}>
      <Text style={styles.notificationText}>{message}</Text>
      <TouchableOpacity style={styles.closeButton} onPress={onHide}>
        <Text style={styles.closeButtonText}>X</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const RegistrationModal = ({ modalVisible, setModalVisible, onSuccess }) => {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState(null);

  


  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "https://messe-app-server.onrender.com/users/register",
        {
          username,
          email,
          password,
          phone,
        }
      );

      setModalVisible(false);
      onSuccess("Registration successful!");
    }  catch (error) {
        if (error.response) {
          if (error.response.status === 401) {
            // Unauthorized - Display error message to user
            setError(error.response.data.message);
          } else {
            // Handle other response errors
            console.error(`Error: ${error.response.status} - ${error.response.data.message}`);
            setError("An error occurred during registration.");
          }
        } else {
          // Handle other types of errors (e.g., network issues)
          console.error(`Error: ${error.message}`);
          setError("A network error occurred. Please try again.");
        }
      }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={() => setModalVisible(!modalVisible)}
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
              placeholder="Email"
              placeholderTextColor="#A9A9A9"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextInput
              style={styles.input}
              placeholder="Phone"
              placeholderTextColor="#A9A9A9"
              value={phone}
              onChangeText={setPhone}
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

            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="#A9A9A9"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={true}
            />

            <Button title="Register" onPress={handleRegister} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default RegistrationModal;

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
  // Notification
  notification: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#007bff",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: width - 20,
    alignSelf: "center",
    borderRadius: 5,
    margin: 10,
  },
  notificationText: {
    color: "#fff",
    flex: 1,
  },
});
