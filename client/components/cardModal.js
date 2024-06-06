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
  


const StandeModal = ({modalVisible, setModalVisible }) => {
    const navigation = useNavigation();
  

    return ( 
        <>
        <StatusBar />
        <Modal
     animationIn="slideInRight"
     animationInTiming={800}
     animationOut="slideOutRight"
     animationOutTiming={800}
     backdropTransitionInTiming={800}
     backdropTransitionOutTiming={800}
     swipeDirection="right"
        isVisible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        style={styles.cardModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Image source={arrowCloseButton}/>
            </TouchableOpacity>
           
    
          </View>
        </View>
      </Modal>
      </>
    )

}

export default StandeModal;

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


})