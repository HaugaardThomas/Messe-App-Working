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
  


const CardModal = ({cardModalVisible, setCardModalVisible }) => {
    const navigation = useNavigation();

    // DARKMODE
    const { theme, toggleTheme } = useContext(ThemeContext); 


    const addNewCard = () => {

    }
  

    return ( 
        <>
        <Modal
     animationIn="slideInRight"
     animationInTiming={800}
     animationOut="slideOutRight"
     animationOutTiming={700}
     backdropTransitionInTiming={800}
     backdropTransitionOutTiming={700}
     swipeDirection="right"
     onSwipeComplete={() => setCardModalVisible(false)}
        isVisible={cardModalVisible}
        onRequestClose={() => {
          setCardModalVisible(!cardModalVisible);
        }}
        style={styles.cardModal}
      >
        <View style={[styles.centeredView, {backgroundColor: theme.backgroundColor}]}>
          <View style={[styles.modalView, {backgroundColor: theme.backgroundColor}]}>
       
            {/* <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setCardModalVisible(!cardModalVisible)}
            >
              <Image source={arrowCloseButton}/>
            </TouchableOpacity> */}

          <View style={styles.goBackContainer}>
            <TouchableOpacity onPress={() => setCardModalVisible(!cardModalVisible)}>
            <Ionicons  name="chevron-back" size={24} color={theme.textColor} />
            </TouchableOpacity>
          </View>
           
           <View style={styles.modalContentContainer}>
              <View style={[styles.modalCardContainer, {backgroundColor: theme.subBackgroundColor}]}>

              </View>
           </View> 

           <View style={styles.newCardButtonContainer}>
              <TouchableOpacity style={[styles.newCardButtonOuterBorder, {borderColor: theme.textColor}]}>
              <TouchableOpacity style={[styles.newCardButtonInnerButton, {backgroundColor: theme.textColor}]} onPress={addNewCard}>
                <Text style={[styles.newCardButtonText, {color: theme.backgroundColor}]}>Tilføj nyt kort</Text>
              </TouchableOpacity>
              </TouchableOpacity>
            </View>
    
          </View>
          </View>

      </Modal>
      </>
    )

}

export default CardModal;

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;


const styles = StyleSheet.create({
 // Modal
 cardModal: {
    // backgroundColor: 'white',
    margin: 0, 
 },
 centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
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
  secondContainer: {
    paddingLeft: 35,
    paddingRight: 35,
  },
  modalContentContainer: {
    paddingTop: 50,
   alignItems: 'center',
  },
  modalCardContainer: {
    // backgroundColor: '#F4F4F4', 
    width: '100%',
    height: 200,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
   
  },
   // LINE
   viewLine: {
    marginTop: 40,
    height: 0.3,
    backgroundColor: '#696969',
    width: 400,
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
  // BUTTON
  newCardButtonContainer: {
    marginTop: 50,
    alignItems: 'center',
    marginTop: 25,    
  },
  newCardButtonOuterBorder: {
    borderRadius: 25,
    padding: 2,
    borderWidth: 3,
  },
  newCardButtonInnerButton: {
   borderRadius: 25,
  },
  newCardButtonText: {
  color: 'white',
  fontWeight: 'bold',
    paddingVertical: 10,
    paddingHorizontal: 25,
  },


})