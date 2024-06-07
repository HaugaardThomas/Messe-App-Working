import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Dimensions,
  StatusBar,
  Switch,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useNavigation } from "@react-navigation/native";

import axios from "axios";
import { useLogin } from "../context/LoginProvider";

import ProfilePic from '../assets/images/profile_pic.png';

import { Ionicons, MaterialIcons } from '@expo/vector-icons';

// MODALS
import CardModal from '../components/cardModal';
import ProfileDetailModal from "../components/profileDetail";
import SettingsModal from "../components/settingsModal";




const ProfileScreen2 = () => {
  const [user, setUser] = useState('');
  const navigation = useNavigation();
  const { login, logout, isLoggedIn } = useLogin();
  const [userData, setUserData] = useState([]);
  const [userId, setUserId] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  // Modals
  const [cardModalVisible, setCardModalVisible] = useState(false);
  const [profileDetailModalVisible, setProfileDetailModalVisible] = useState(false);
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);

  // DATA
  const [currentEmail, setCurrentEmail] = useState("");
  const [currentPhone, setCurrentPhone] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");


  // INPUT FIELDS
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newPassword, setNewPassword] = useState("");


  // Hent username
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("userID");
        if (storedUserId) {
          setUserId(storedUserId);
        }
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };
    fetchUserId();
  }, []);


  useEffect(() => {
    if (userId) {
      fetch(`https://messe-app-server.onrender.com/users/user/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setUserData(data);
          setCurrentEmail(data.email);
          setCurrentPhone(data.phone);

        })
        .catch((error) => console.error("Error:", error));
    }
  }, [userId]);

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

  const handleUpdateEmail = () => {
    // Handle the email update logic here
    console.log("Email updated to:", newEmail);
    // Reset the new email input after updating
    setNewEmail("");
  };

  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.safeAreaViewContainer}>

        <View style={styles.headerContainer}>

          <View style={styles.goBackContainer}>
            <Ionicons name="chevron-back" size={24} color="black" />
          </View>

          <View style={styles.editProfileTitleContainer}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </View>

          <View style={styles.settingsContainer}>
            <Ionicons name="settings-sharp" size={24} color="black" />
          </View>

        </View>

        <View style={styles.profilePictureBackgroundContainer}>
          <View style={styles.profilePicContainer}>
            <View style={styles.profilePicBackgroundCircle}>
              <Image style={styles.profilePicImage} source={ProfilePic} />
            </View>
          </View>
        </View>

        <View style={styles.usernameContainer}>
          <Text style={styles.usernameText}>{user}</Text>
        </View>


        <View style={styles.mainContainer}>

          <View style={styles.inputMainContainer}>
            <View style={styles.inputLabel}>
              <Text style={styles.labelText}>Din email</Text>
            </View>

            <View style={styles.inputAndIconContainer}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  onChangeText={setNewEmail}
                  placeholder={currentEmail}
                />
                {newEmail ? (
                  <TouchableOpacity onPress={handleUpdateEmail}>
                    
                    <Text style={styles.updateButtonText}>Update</Text>
                  </TouchableOpacity>
                ) : (
                  <MaterialIcons name="mode-edit" size={24} color="black" />
                )}
              </View>
            </View>
          </View>


          <View style={styles.inputMainPhoneContainer}>
            <View style={styles.inputLabel}>
              <Text style={styles.labelText}>Telefonnummer</Text>
            </View>

            <View style={styles.inputAndIconContainer}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  onChangeText={setNewPhone}
                  placeholder={currentPhone}
                />
                <MaterialIcons name="mode-edit" size={24} color="black" />
              </View>
            </View>
          </View>

          <View style={styles.inputMainPasswordContainer}>
            <View style={styles.inputLabel}>
              <Text style={styles.labelText}>Password</Text>
            </View>

            <View style={styles.inputAndIconContainer}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  onChangeText={setNewPhone}
                  placeholder="●●●●●●●●●●●"
                  secureTextEntry={true}

                />
                <MaterialIcons name="mode-edit" size={24} color="black" />
              </View>
            </View>
          </View>


        </View>
      </SafeAreaView>
    </>
  )
}

export default ProfileScreen2;

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  // HEADER
  headerContainer: {
    paddingTop: 70,
    paddingLeft: 35,
    paddingRight: 35,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
  },
  goBackContainer: {

  },
  editProfileTitleContainer: {

  },
  editProfileText: {
    fontSize: 16,
    fontWeight: '500',
  },
  settingsContainer: {

  },
  // PROFILE PICTURE
  profilePictureBackgroundContainer: {
    // backgroundColor: '#F4F4F4',
    // height: 170,
    // paddingTop: 100,
    marginTop: 50,

  },
  profilePicContainer: {
    alignItems: 'center',
  },
  profilePicBackgroundCircle: {
    backgroundColor: 'white',
    borderRadius: 200,
    width: 130,
    height: 130,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
  },
  profilePicImage: {
    width: 120,
    height: 120,
  },
  // USERNAME
  usernameContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  usernameText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  // CONTENT
  mainContainer: {
    paddingTop: 50,
    paddingLeft: 35,
    paddingRight: 35,
  },
  inputMainContainer: {},
  inputMainPhoneContainer: {
    marginTop: 15,
  },
  inputMainPasswordContainer: {
    marginTop: 15,
  },
  inputLabel: {},
  labelText: {
    fontSize: 16,
  },
  inputAndIconContainer: {
    flexDirection: 'row',
    justifyContent: "space-between",

  },
  inputContainer: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  input: {
    fontSize: 14,
    alignItems: 'center',
    paddingVertical: 5,
  },
  iconContainer: {},
  updateButtonText: {
    backgroundColor: '#32cd32',
    color: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 30,
    

  },

});

