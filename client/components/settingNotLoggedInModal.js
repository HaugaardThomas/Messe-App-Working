import {
    View,
    Text,
    StyleSheet,
    Image,
    SafeAreaView,
    TextInput,
    FlatList,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    Switch,
    Dimensions,
  } from "react-native";
  import React, { useState, useEffect, useContext } from "react";
  import { useNavigation } from '@react-navigation/native';
  import Modal from 'react-native-modal';
  
  // Image
  import img1 from "../assets/images/Shop_transparent.png";
  import arrowCloseButton from "../assets/images/Arrow_close_button.png";

    // CONTEXT
 import { ThemeContext } from "../context/ThemeContext";

 // ICONS 
 import { Ionicons } from '@expo/vector-icons';
  


const SettingNotLoggedInModal = ({settingNoModal, setSettingNoModal}) => {
    const navigation = useNavigation();

       // DARKMODE
       const { theme, toggleTheme } = useContext(ThemeContext); 
  

    return ( 
        <>
        <Modal
     animationIn="slideInRight"
     animationInTiming={800}
     animationOut="slideOutRight"
     animationOutTiming={800}
     backdropTransitionInTiming={800}
     backdropTransitionOutTiming={800}
     swipeDirection="right"
     onSwipeComplete={() => setSettingNoModal(false)}
        isVisible={settingNoModal}
        onRequestClose={() => {
            setSettingNoModal(!settingNoModal);
        }}
        style={styles.cardModal}
      >
         <View style={[styles.centeredView, {backgroundColor: theme.backgroundColor}]}>
         <View style={[styles.modalView, {backgroundColor: theme.backgroundColor}]}>
         
         
          <View style={styles.goBackContainer}>
            <TouchableOpacity onPress={() => setSettingNoModal(!settingNoModal)}>
            <Ionicons  name="chevron-back" size={28} color={theme.textColor} />
            </TouchableOpacity>
          </View>

          <View style={[styles.darkModeContainer, {borderTopColor: theme.textColor}]}>
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
           
    
          </View>
        </View>
      </Modal>
      </>
    )

}

export default SettingNotLoggedInModal;

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
    // DARKMODE
    darkModeContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        height: 50,
        alignItems: 'center',
        marginTop: 50,
        borderTopWidth: 1,
      },
      darkModeTouchable: {},
      darkModeIconTextContainer: {
        flexDirection: 'row',
      },
      darkModeText: {
        marginLeft: 10,
        marginTop: 2,
      },
      darkModeToggle: {
        padding: 0,
      },
      darkModeSwitchToggle: {},

})