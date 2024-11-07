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
  


const ArMenuModal = ({}) => {
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
                 <View style={[styles.centeredView, {backgroundColor: theme.backgroundColor}]}>
              <View style={[styles.modalView, { backgroundColor: theme.subBackgroundColor }]}>
              
              <View>
                <Text>Test</Text>
              </View>


              </View>
              </View>
          </Modal>
        </>
      )
    }
    
    export default ArMenuModal;
    
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
      goBackContainer: {
    
      },
     
    });