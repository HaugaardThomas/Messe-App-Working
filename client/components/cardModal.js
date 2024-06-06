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
  import { StatusBar } from "expo-status-bar";
  import React, { useState, useEffect } from "react";
  import { useNavigation } from '@react-navigation/native';
  import Modal from 'react-native-modal';
  
  // Image
  import img1 from "../assets/images/Shop_transparent.png";
  import arrowCloseButton from "../assets/images/Arrow_close_button.png";
  


const CardModal = ({cardModalVisible, setCardModalVisible }) => {
    const navigation = useNavigation();


    const addNewCard = () => {

    }
  

    return ( 
        <>
        <StatusBar />
        <Modal
     animationIn="slideInRight"
     animationInTiming={800}
     animationOut="slideOutRight"
     animationOutTiming={700}
     backdropTransitionInTiming={800}
     backdropTransitionOutTiming={700}
     swipeDirection="right"
        isVisible={cardModalVisible}
        onRequestClose={() => {
          setCardModalVisible(!cardModalVisible);
        }}
        style={styles.cardModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
       
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setCardModalVisible(!cardModalVisible)}
            >
              <Image source={arrowCloseButton}/>
            </TouchableOpacity>
           
           <View style={styles.modalContentContainer}>
              <View style={styles.modalCardContainer}>

              </View>
           </View> 

           <View style={styles.newCardButtonContainer}>
              <TouchableOpacity style={styles.newCardButtonOuterBorder}>
              <TouchableOpacity style={styles.newCardButtonInnerButton} onPress={addNewCard}>
                <Text style={styles.newCardButtonText}>Tilføj nyt kort</Text>
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
    backgroundColor: 'white',
    margin: 0, 
 },
 centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: '100%',
    height: '100%',
    backgroundColor: "white",
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
  secondContainer: {
    paddingLeft: 35,
    paddingRight: 35,
  },
  modalContentContainer: {
    paddingTop: 50,
   alignItems: 'center',
  },
  modalCardContainer: {
    backgroundColor: '#F4F4F4', 
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
    backgroundColor: 'black',
   borderRadius: 25,
  },
  newCardButtonText: {
  color: 'white',
  fontWeight: 'bold',
    paddingVertical: 10,
    paddingHorizontal: 25,
  },


})