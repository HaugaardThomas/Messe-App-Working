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
  ScrollView,
  TextInput,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useNavigation } from "@react-navigation/native";

import axios from "axios";
import { useLogin } from "../context/LoginProvider";

import ProfilePic from "../assets/images/profile_pic.png";

import {
  Ionicons,
  FontAwesome,
  Octicons,
  MaterialCommunityIcons,
  AntDesign,
  MaterialIcons,
} from "@expo/vector-icons";

// MODALS
import CardModal from "../components/cardModal";
import ProfileDetailModal from "../components/profileDetail";
import SettingsModal from "../components/settingsModal";
import CalendarModal from "../components/calendarModal";

// CONTEXT
import { ThemeContext } from "../context/ThemeContext";

const ProfileScreen3 = () => {
  const [user, setUser] = useState("");
  const navigation = useNavigation();
  const { login, logout, isLoggedIn } = useLogin();
  const [userData, setUserData] = useState([]);
  const [userId, setUserId] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  // DARKMODE
  const { theme, toggleTheme } = useContext(ThemeContext);

  // Modals
  const [cardModalVisible, setCardModalVisible] = useState(false);
  const [profileDetailModalVisible, setProfileDetailModalVisible] =
    useState(false);
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const [calendarModalVisible, setCalendarModalVisible] = useState(false);

  const [creationDate, setCreationDate] = useState("");

  // Hent user ID
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
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          // console.log(data);
          setUserData(data);
          setCreationDate(
            new Date(data.creationDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          );
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

  return (
    <SafeAreaView
      style={[
        styles.safeAreaViewContainer,
        { backgroundColor: theme.backgroundColor },
      ]}
    >
      <View style={styles.mainContainer}>
        <TouchableOpacity
          onPress={() => {
            setCalendarModalVisible(true);
          }}
        >
          <View style={styles.headerContainer}>
            <View style={styles.bellContainer}>
              <AntDesign name="calendar" size={24} color={theme.textColor} />
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.profilePictureBackgroundContainer}>
          <View style={styles.profilePicContainer}>
            <View style={styles.profilePicBackgroundCircle}>
              <Image style={styles.profilePicImage} source={ProfilePic} />
            </View>
          </View>
        </View>

        <View style={styles.usernameContainer}>
          <Text style={[styles.usernameText, { color: theme.textColor }]}>
            {user}
          </Text>
          <Text>{creationDate}</Text>
        </View>

        <View
          style={[
            styles.generalInfoContainer,
            { borderColor: theme.subBackgroundColor },
          ]}
        >
          <View style={styles.generalTitleContainer}>
            <Text style={[styles.generalTitle, { color: theme.textColor }]}>
              General
            </Text>
          </View>

          <View style={styles.generalNameContainer}>
            <View style={styles.generalIconContainer}>
              <MaterialCommunityIcons
                name="account-outline"
                size={26}
                color={theme.textColor}
              />
            </View>
            <View style={styles.generalTextContainer}>
              <Text style={[styles.generalText, { color: theme.textColor }]}>
                {user}
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.viewLine,
              { backgroundColor: theme.subBackgroundColor },
            ]}
          ></View>

          <View style={styles.generalNameContainer2}>
            <View style={styles.generalIconContainer}>
              <MaterialCommunityIcons
                name="email-outline"
                size={24}
                color={theme.textColor}
              />
            </View>
            <View style={styles.generalTextContainer}>
              <Text style={[styles.generalText, { color: theme.textColor }]}>
                {userData.email}
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.viewLine,
              { backgroundColor: theme.subBackgroundColor },
            ]}
          ></View>

          <View style={styles.generalNameContainer2}>
            <View style={styles.generalIconContainer}>
              <MaterialCommunityIcons
                name="cellphone"
                size={24}
                color={theme.textColor}
              />
            </View>
            <View style={styles.generalTextContainer}>
              <Text style={[styles.generalText, { color: theme.textColor }]}>
                {userData.phone}
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.viewLine,
              { backgroundColor: theme.subBackgroundColor },
            ]}
          ></View>

          <View style={styles.generalNameContainer3}>
            <View style={styles.generalIconContainer}>
              <MaterialCommunityIcons
                name="chat-outline"
                size={24}
                color={theme.textColor}
              />
              <Text
                style={[styles.generalFeedbackText, { color: theme.textColor }]}
              >
                Feedback
              </Text>
            </View>
            <View style={styles.cardArrowContainer}>
              <Octicons
                name="chevron-right"
                size={24}
                color={theme.iconColor}
              />
            </View>
          </View>

 </View>
          <View style={[styles.darkModeChoiceContainer,{ borderColor: theme.subBackgroundColor }]}>
          <View style={styles.generalTitleContainer}>
            <Text style={[styles.generalTitle, { color: theme.textColor }]}>
              Preference
            </Text>
          </View>
          <View style={styles.generalNameContainer4}>
            <View style={styles.generalIconContainer}>
              <FontAwesome name="moon-o" size={24} color={theme.textColor} />
              <Text
                style={[styles.generalFeedbackText, { color: theme.textColor }]}>Dark mode</Text>
            </View>
            <View style={styles.cardArrowContainer}>
              <Switch
                trackColor={{
                  false: theme.switchTrackColor,
                  true: theme.switchTrackColor,
                }}
                thumbColor={theme.switchThumbColor}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleTheme}
                value={theme.backgroundColor === "#121212"}
                style={styles.darkModeSwitchToggle}
              />
            </View>
          </View>
          </View>       
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen3;

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
  },
  mainContainer: {
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    // paddingTop: 10,
    // paddingLeft: 35,
    // paddingRight: 35,
  },
  // PROFILE PICTURE
  profilePictureBackgroundContainer: {
    paddingTop: 30,
  },
  profilePicContainer: {
    alignItems: "center",
  },
  profilePicBackgroundCircle: {
    backgroundColor: "white",
    borderRadius: 200,
    width: 130,
    height: 130,
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
  },
  profilePicImage: {
    width: 120,
    height: 120,
  },
  // PROFILE NAME
  usernameContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  usernameText: {
    fontSize: 32,
    fontWeight: "bold",
  },
  generalInfoContainer: {
    borderWidth: 1,
    borderRadius: 25,
    // height: 200,
    padding: 15,
  },

  generalTitleContainer: {},
  generalTitle: {
    fontWeight: "bold",
    fontSize: 18,
  },

  // General Name
  generalNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  generalTextContainer: {
    marginLeft: 10,
  },
  generalText: {
    fontSize: 16,
  },
  generalFeedbackText: {
    marginLeft: 10,
  },
  // Line
  viewLine: {
    height: 1,
    marginVertical: 10,
  },
  generalNameContainer2: {
    flexDirection: "row",
    alignItems: "center",
  },
  generalIconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  generalNameContainer3: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  // PREFERNCE
  darkModeChoiceContainer: {
    borderWidth: 1,
    borderRadius: 25,
    padding: 15,
    marginTop: 20,
  },
  generalNameContainer4: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  
});
