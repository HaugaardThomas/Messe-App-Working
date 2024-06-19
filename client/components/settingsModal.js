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
  


const SettingsModal = ({settingsModalVisible, setSettingsModalVisible }) => {
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
     onSwipeComplete={() => setSettingsModalVisible(false)}
        isVisible={settingsModalVisible}
        onRequestClose={() => {
            setSettingsModalVisible(!settingsModalVisible);
        }}
        style={styles.cardModal}
      >
         <View style={[styles.centeredView, {backgroundColor: theme.backgroundColor}]}>
         <View style={[styles.modalView, {backgroundColor: theme.backgroundColor}]}>
         
         
          <View style={styles.goBackContainer}>
            <TouchableOpacity onPress={() => setCardModalVisible(!cardModalVisible)}>
            <Ionicons  name="chevron-back" size={24} color={theme.textColor} />
            </TouchableOpacity>
          </View>
           
    
          </View>
        </View>
      </Modal>
      </>
    )

}

export default SettingsModal;

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;


const styles = StyleSheet.create({
 // Modal
 cardModal: {
    backgroundColor: 'white',
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
    paddingTop: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },


})