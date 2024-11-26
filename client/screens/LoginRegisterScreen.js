import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Dimensions,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";

import { useNavigation } from "@react-navigation/native";

// Components
import RegistrationModal from "../components/registerModal";
import LoginModal from "../components/loginModal";
import SettingNotLoggedInModal from '../components/settingNotLoggedInModal';

// Images
import arrowCloseButton from "../assets/images/Arrow_close_button.png";

// Icon
import { Feather, AntDesign, Ionicons } from "@expo/vector-icons";

 // CONTEXT
 import { ThemeContext } from "../context/ThemeContext";

import { useLogin } from "../context/LoginProvider";

const LoginRegisterScreen = () => {
  const navigation = useNavigation();

    // DARKMODE
    const { theme, toggleTheme } = useContext(ThemeContext); 

  const [settingNoModal, setSettingNoModal] = useState(false);  
  const [modalRegisterVisible, setModalRegisterVisible] = useState(false);
  const [modalLoginVisible, setModalLoginVisible] = useState(false);
  const { login, isLoggedIn } = useLogin();

  useEffect(() => {
    console.log("Is Logged In:", isLoggedIn); // Log the value of isLoggedIn
    if (isLoggedIn) {
      // If user is already logged in, navigate them to ProfileScreen
      navigation.navigate("ProfileScreen");
    }
  }, [isLoggedIn, navigation]);

  const goBackButton = () => {
    navigation.goBack();
  };

  const goToLoginScreen = () => {
    navigation.navigate("LoginScreen");
  };

  return (
    <>
      <SafeAreaView style={styles.safeAreaViewContainer}>
        <View style={styles.mainContainer}>

          <View style={styles.headerContainer}>

          <View style={styles.goBackContainer}>
            <TouchableOpacity onPress={() => setCardModalVisible(!cardModalVisible)}>
            <Ionicons  name="chevron-back" size={28} color={theme.textColor} />
            </TouchableOpacity>
          </View>

          <View>
          <TouchableOpacity onPress={() => setSettingNoModal(!settingNoModal)}>
          <Feather name="settings" size={24} color={theme.textColor}  />
            </TouchableOpacity>
          </View>

          </View>

          <View style={styles.userRegisterIconContainer}>
            <Feather
              name="user-plus"
              size={42}
              color={theme.textColor}
              style={styles.userRegisterIcon}
            />
          </View>

          <View style={styles.registerTitleContainer}>
            <Text style={[styles.registerTitle, {color: theme.textColor}]}>Register</Text>
          </View>

          <View style={styles.gotAnAccountLoginContainer}>
            <View>
              <Text style={[styles.gotAccountText, {color: theme.textColor}]}>Got an account?</Text>
            </View>

            <View>
              <TouchableOpacity  onPress={() => {
                  setModalLoginVisible(true);
                }}>
                <View style={styles.loginHereFlexContainer}>
                  <Text style={styles.loginHereText}>Log in here</Text>
                  <View style={styles.arrowIconLogin}>
                    <AntDesign
                      name="arrowright"
                      size={16}
                      color="#004ce5"
                      style={styles.userRegisterIcon}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <LoginModal modalLoginVisible={modalLoginVisible} setModalLoginVisible={setModalLoginVisible}/>
          </View>

          <View style={styles.selectRegisterOptionsContainer}>
            <View style={styles.emailUsernameOptionContainer}>
              <TouchableOpacity style={[styles.emailUsernameOptionTouch, {backgroundColor: theme.subBackgroundColor}]}  onPress={() => {
                  setModalRegisterVisible(true);
                }}
              >
                <View style={styles.atIconContainer}>
                  <Feather
                    name="at-sign"
                    size={32}
                    color={theme.textColor}
                    style={styles.atSignIcon}
                  />
                </View>
                <Text style={styles.emailUsernameOptionWithText}>With</Text>
                <Text style={[styles.emailUsernameOptionWithOption, {color: theme.textColor}]}>
                  Email & Username
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.emailUsernameOptionContainer}>
              <TouchableOpacity style={[styles.emailUsernameOptionTouch, {backgroundColor: theme.subBackgroundColor}]}>
                <View style={styles.atIconContainer}>
                  <Feather
                    name="mail"
                    size={32}
                    color="red"
                    style={styles.atSignIcon}
                  />
                </View>
                <View style={styles.withSelectionContainer}>
                  <Text style={styles.emailUsernameOptionWithText}>With</Text>
                  <Text style={[styles.emailUsernameOptionWithOption, {color: theme.textColor}]}>
                    Gmail
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <RegistrationModal modalRegisterVisible={modalRegisterVisible} setModalRegisterVisible={setModalRegisterVisible}/>
        <SettingNotLoggedInModal settingNoModal={settingNoModal} setSettingNoModal={setSettingNoModal} />
      </SafeAreaView>
    </>
  );
};

export default LoginRegisterScreen;

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  // GO BACK BUTTON
  goBackButtonContainer: {},
  profileGoBackButton: {
    position: "absolute",
    left: 0,
    top: 0,
    borderRadius: 25,
    padding: 10,
    elevation: 2,
    backgroundColor: "black",
  },
  // USER REGISTER ICON
  userRegisterIconContainer: {
    marginTop: 300,
  },
  userRegisterIcon: {},
  // Register TITLE
  registerTitleContainer: {
    marginTop: 5,
  },
  registerTitle: {
    fontSize: 32,
    fontWeight: "bold",
  },
  // GOT AN ACCOUNT?
  gotAnAccountLoginContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  loginHereFlexContainer: {
    flexDirection: "row",
  },
  loginHereText: {
    color: "#004ce5",
  },
  arrowIconLogin: {
    marginTop: 1,
    marginLeft: 3,
  },
  // Register option selection
  selectRegisterOptionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  // Email og Username
  emailUsernameOptionContainer: {
    marginTop: 30,
    width: "48%",
  },
  emailUsernameOptionTouch: {
    minHeight: 150,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  atIconContainer: {},
  atSignIcon: {},
  withSelectionContainer: {
    marginTop: 15,
  },
  emailUsernameOptionWithText: {
    marginTop: 30,
    color: "#B5B5B5",
  },
  emailUsernameOptionWithOption: {},

  // Emails, som gmail
  emailGmailOptionContainer: {},

  // Modal
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
});
