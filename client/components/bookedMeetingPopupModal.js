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

  import { Picker } from '@react-native-picker/picker';

  // AsyncStorage
  import AsyncStorage from "@react-native-async-storage/async-storage";

  
  // Image
  import img1 from "../assets/images/Shop_transparent.png";
  import arrowCloseButton from "../assets/images/Arrow_close_button.png";

    // CONTEXT
 import { ThemeContext } from "../context/ThemeContext";

 // ICONS 
 import { Ionicons, AntDesign } from '@expo/vector-icons';
  


const BookedMeetingPopupModal = ({popUpModal, setPopUpModal}) => {
    const navigation = useNavigation();
        // DARKMODE
       const { theme, toggleTheme } = useContext(ThemeContext); 




   

    

       return (
        <>
          <Modal
            backdropTransitionInTiming={800}
            backdropTransitionOutTiming={800}
            animationType="slide"
            transparent={true}
            isVisible={popUpModal}
            onRequestClose={() => {
                setPopUpModal(!popUpModal);
            }}
            style={styles.cardModal}
            onBackdropPress={() => {
                setPopUpModal(!popUpModal);
            }}
          >
              <View style={[styles.modalView, { backgroundColor: theme.subBackgroundColor }]}>

                <View>
                    <Text>
                        Booket møde gennemført
                    </Text>
                </View>
         
              
              </View>
          </Modal>
        </>
      )
    }
    
    export default BookedMeetingPopupModal;
    
    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;
    
    const styles = StyleSheet.create({
      // Modal
      cardModal: {
        margin: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
      },
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
      
      modalView: {
        width: windowWidth * 0.8,
        height: windowHeight * 0.2,
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      // GO BACK
      goBackContainer: {
    
      },
      modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
      },
      modalText: {
        marginBottom: 20,
        textAlign: 'center',
      },
      button: {
        backgroundColor: 'blue',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      // PICKER
      picker: {
        marginTop: 0,
        paddingTop: 0,
       },
      // BOOK KNAP
      standBookKnapTouchBook: {
        borderRadius: 25,
        alignItems: "center",
      },
      standBookTextBook: {
        fontWeight: 'bold',
          paddingVertical: 15,
          paddingHorizontal: 60,
          fontSize: 18,
        },
    });