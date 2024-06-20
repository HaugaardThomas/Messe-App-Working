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

  import ProfilePic from '../assets/images/profile_pic.png';

  import { Ionicons, FontAwesome, Octicons, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

  // MODALS
  import CardModal from '../components/cardModal';
  import ProfileDetailModal from "../components/profileDetail";
  import SettingsModal from "../components/settingsModal";
  import CalendarModal from "../components/calendarModal";

  // CONTEXT
  import { ThemeContext } from "../context/ThemeContext";



const ProfileScreen = () => {
  const [user, setUser] = useState('');
  const navigation = useNavigation();
  const { login, logout, isLoggedIn } = useLogin();
  const [userData, setUserData] = useState([]);
  const [userId, setUserId] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  // DARKMODE
  const { theme, toggleTheme } = useContext(ThemeContext); 

  // Modals
  const [cardModalVisible, setCardModalVisible] = useState(false);
  const [profileDetailModalVisible, setProfileDetailModalVisible] = useState(false);
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const [calendarModalVisible, setCalendarModalVisible] = useState(false);

 


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


  

  return(
    <>
    <SafeAreaView style={[styles.safeAreaViewContainer, {backgroundColor: theme.backgroundColor}]}>
<ScrollView>

<TouchableOpacity onPress={() => {
       setCalendarModalVisible(true);
  }}>
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
 
      <View style={styles.mainContainer}>
       

 
      <View style={styles.usernameContainer}>
        <Text style={[styles.usernameText, {color: theme.textColor}]}>{user}</Text>
      </View>


      <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            clearButtonMode="always"
            value={query}
            onChangeText={handleSearch}
            placeholder="Search..."
            placeholderTextColor={theme.textColor}
            style={[styles.searchInput, {backgroundColor: theme.subBackgroundColor, color: theme.textColor}]}
          />
   

      <View key={user._id} style={styles.phoneContainer}>
        <View style={styles.phoneTextContainer}>
            <Text style={[styles.phoneText, {color: theme.textColor}]}>Phone</Text>
        </View>
        <View style={styles.phoneDataContainer}>
          <Text style={[styles.phoneDataText, {color: theme.textColor}]}>{userData.phone}</Text>
        </View>
      </View>
    


      <View style={styles.emailContainer}>
        <View style={styles.emailTextContainer}>
            <Text style={[styles.emailText, {color: theme.textColor}]}>Email</Text>
        </View>
        <View style={styles.emailDataContainer}>
          <Text style={[styles.emailDataText, {color: theme.textColor}]}>{userData.email}</Text>
        </View>
      </View>
  </View> 
  <View style={styles.viewLine}></View>
  <View style={styles.secondMainContainer}>

  <View style={styles.darkModeContainer}>
            <View style={styles.darkModeIconTextContainer}>
              <Ionicons name="moon" size={24} color={theme.iconColor} />
              <Text style={[styles.darkModeText, { color: theme.textColor }]}>Dark mode</Text>
            </View>
            <View style={styles.darkModeToggle}>
              <Switch
                trackColor={{ false: theme.switchTrackColor, true: theme.switchTrackColor }}
                thumbColor={theme.switchThumbColor}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleTheme}
                value={theme.backgroundColor === '#121212'}
                style={styles.darkModeSwitchToggle}
              />
            </View>
          </View>

      <View style={styles.viewLineSmall}></View>

  <TouchableOpacity onPress={() => {
       setCardModalVisible(true);
  }}>
      <View style={styles.cardContainer}>
        <View style={styles.cardIconTextContainer}>
        <FontAwesome name="credit-card" size={24} color={theme.iconColor} />
          <Text style={[styles.cardText, { color: theme.textColor }]}>Card</Text>
        </View>
        <View style={styles.cardArrowContainer}>
        <Octicons name="chevron-right" size={24} color={theme.iconColor} />
        </View>
      </View>
 </TouchableOpacity>

      <View style={styles.viewLineSmall}></View>

      <TouchableOpacity onPress={() => {
       setProfileDetailModalVisible(true);
  }}>
      <View style={styles.profileDetailsContainer}>
        <View style={styles.profileDetailsIconTextContainer}>
        <MaterialCommunityIcons name="account" size={24} color={theme.iconColor} />
          <Text style={[styles.profileDetailsText, { color: theme.textColor }]}>Profile Details</Text>
        </View>
        <View style={styles.profileDetailsArrowContainer}>
        <Octicons name="chevron-right" size={24} color={theme.iconColor} />
        </View>
      </View>
      </TouchableOpacity>

      <View style={styles.viewLineSmall}></View>

      <TouchableOpacity onPress={() => {
       setSettingsModalVisible(true);
  }}>
<View style={styles.settingsContainer}>
  <View style={styles.settingsIconTextContainer}>
  <Ionicons name="settings-sharp" size={24} color={theme.iconColor}/>
    <Text style={[styles.settingsText, { color: theme.textColor }]}>Settings</Text>
  </View>
  <View style={styles.settingsArrowContainer}>
  <Octicons name="chevron-right" size={24} color={theme.iconColor} />
  </View>
</View>
</TouchableOpacity>

      <View style={styles.logoutButtonContainer}>
            <TouchableOpacity onPress={logoutHandle} style={[styles.loginButton, {backgroundColor: theme.backgroundColor}]}>
              <Text style={styles.textLoginButton}>Log out</Text>
            </TouchableOpacity>
          </View>

          <CardModal cardModalVisible={cardModalVisible} setCardModalVisible={setCardModalVisible} />
          <ProfileDetailModal profileDetailModalVisible={profileDetailModalVisible} setProfileDetailModalVisible={setProfileDetailModalVisible} />
          <SettingsModal settingsModalVisible={settingsModalVisible} setSettingsModalVisible={setSettingsModalVisible}/>
          <CalendarModal calendarModalVisible={calendarModalVisible} setCalendarModalVisible={setCalendarModalVisible} user={user}/>
    </View>
    </ScrollView>
    </SafeAreaView>
    </>
  )
}

export default ProfileScreen;

const styles = StyleSheet.create({
  searchInput: {
    fontSize: 16,
    backgroundColor: "#F4F4F4",
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
  },
  safeAreaViewContainer: {
    flex: 1,
    // backgroundColor: "white",
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 10,
    paddingLeft: 35,
    paddingRight: 35,
  },
  mainContainer: {
    paddingTop: 40,
    paddingLeft: 35,
    paddingRight: 35,
  },
  secondMainContainer: {
    paddingTop: 10,
    paddingLeft: 35,
    paddingRight: 35,
  },
  logoutButtonContainer: {
    marginTop: 10,
  },
  loginButton: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "red",
  },
  textLoginButton: {
    textTransform: "uppercase",
    textAlign: "center",
    color: "red",
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontWeight: "bold",
  },
  // PROFILE PICTURE
  profilePictureBackgroundContainer: {
    height: 170,
    paddingTop: 90,

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
  // PROFILE NAME
  usernameContainer: {
    marginTop: 32,
    alignItems: 'center',
  },
  usernameText: {
    fontSize: 32,
    fontWeight: 'bold'
  },
  // PHONE
  phoneContainer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: "space-between",
  },
  phoneTextContainer: {
    
  },
  phoneText: {
    fontSize: 18,
    color: '#696969',
  },
  phoneDataContainer: {
  
  },
  phoneDataText: {
    fontSize: 18,
    fontWeight: '600',
  },
  // EMAIL
  emailContainer: {
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: "space-between",
  },
  emailTextContainer: {},
  emailText: {
    color: '#696969',
    fontSize: 18,
  },
  emailDataContainer: {},
  emailDataText: {
    fontWeight: '600',
    fontSize: 18,
  },
  // LINE
  viewLine: {
    marginTop: 40,
    height: 0.3,
    backgroundColor: '#696969',
    width: '100%',
    opacity: 1,
  },
  viewLineSmall: {
    height: 0.3,
    backgroundColor: '#696969',
    width: '100%',
    opacity: 1,
    marginTop: 1,
    marginBottom: 1,

  },
  // DARKMODE
  darkModeContainer: {
    flexDirection: 'row',
    justifyContent: "space-between",
    height: 50,
    alignItems: 'center',
  },
  darkModeTouchable: {
    
  },
  darkModeIconTextContainer: {
    flexDirection: 'row',
  },
  darkModeText: {
    marginLeft: 10,
  },
  darkModeToggle: {
    padding: 0,
    // marginTop: -10,
  },
  darkModeSwitchToggle: {

  },
  // CARD
  cardContainer: {
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: "space-between",
    height: 50,
    alignItems: 'center',
  },
  cardIconTextContainer: {
    flexDirection: 'row',
  },
  cardText: {
    marginLeft: 10,
  },
  cardArrowContainer: {},
  // PROFILE DETAILS
  profileDetailsContainer: {
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: "space-between",
    height: 50,
    alignItems: 'center',
  },
  profileDetailsIconTextContainer: {
    flexDirection: 'row',
  },
  profileDetailsText: {
    marginLeft: 10,
  },
  profileDetailsArrowContainer: {},
  // SETTINGS
  settingsContainer: {
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: "space-between",
    height: 50,
    alignItems: 'center',
  },
  settingsIconTextContainer: {
    flexDirection: 'row',
  },
  settingsText: {
    marginLeft: 10,
  },
  settingsArrowContainer: {},
});