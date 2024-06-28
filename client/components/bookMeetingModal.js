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
  


const BookMeetingModal = ({bookingModalVisible, setBookModalVisible, virksomhedId, setModalVisible }) => {
    const navigation = useNavigation();
    const [userId, setUserId] = useState('');

       // DARKMODE
       const { theme, toggleTheme } = useContext(ThemeContext); 

        // State for selected time
  const [appointmentTime, setAppointmentTime] = useState("10:00-10:15");
  const [responseMessage, setResponseMessage] = useState('');

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

    const makeAppointment = async () => {
      const response = await fetch('https://messe-app-server.onrender.com/appointment/set/appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          virksomhedId,
          appointmentTime,
        }),
      });
  
      const data = await response.json();
      setResponseMessage(data.message);
      setBookModalVisible(false);
      setModalVisible(false);
    };
  

       return (
        <>
          <Modal
            // animationIn="slideInRight"
            // animationInTiming={800}
            // animationOut="slideOutRight"
            // animationOutTiming={800}
            backdropTransitionInTiming={800}
            backdropTransitionOutTiming={800}
            animationType="slide"
            transparent={true}
            isVisible={bookingModalVisible}
            onRequestClose={() => {
              setBookModalVisible(!bookingModalVisible);
            }}
            style={styles.cardModal}
            onBackdropPress={() => {
              setBookModalVisible(!bookingModalVisible);
            }}
          >
        
            {/* <View style={[styles.centeredView, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}> */}
              <View style={[styles.modalView, { backgroundColor: theme.subBackgroundColor }]}>

              <View style={styles.goBackContainer}>
                      <TouchableOpacity onPress={() => setBookModalVisible(!bookingModalVisible)}>
                      {/* <AntDesign name="leftcircle" size={28} color={theme.textColor} /> */}
                      <AntDesign name="closecircle" size={24} color={theme.textColor} />
                      </TouchableOpacity>
                  </View>

                <Text style={[styles.modalTitle, { color: theme.textColor }]}>Vælg en tid</Text>
                <Picker
              selectedValue={appointmentTime}
              onValueChange={(itemValue, itemIndex) => setAppointmentTime(itemValue)}
              style={styles.picker}
            >
               <Picker.Item label="10:00-10:15" value="10:00-10:15" color={theme.textColor} />
              <Picker.Item  label="10:15-10:30" value="10:15-10:30" color={theme.textColor}/>
              <Picker.Item label="10:30-10:45" value="10:30-10:45" color={theme.textColor}/>
              <Picker.Item label="10:45-11:00" value="10:45-11:00" color={theme.textColor}/>
              <Picker.Item label="11:00-11:15" value="11:00-11:15" color={theme.textColor}/>
              <Picker.Item label="11:15-11:30" value="11:15-11:30" color={theme.textColor}/>
              <Picker.Item label="11:30-11:45" value="11:30-11:45" color={theme.textColor}/>
              <Picker.Item label="11:45-12:00" value="11:45-12:00" color={theme.textColor}/>
              <Picker.Item label="12:00-12:15" value="12:00-12:15" color={theme.textColor}/>
            </Picker>
                
          
                <TouchableOpacity style={[styles.standBookKnapTouchBook, {backgroundColor: theme.textColor}]}>
                <Text onPress={makeAppointment} style={[styles.standBookTextBook, {color: theme.backgroundColor}]}>Book</Text>
              </TouchableOpacity>
              
              </View>
            {/* </View> */}
         
          </Modal>
        </>
      )
    }
    
    export default BookMeetingModal;
    
    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;
    
    const styles = StyleSheet.create({
      // Modal
      cardModal: {
        margin: 0,
        justifyContent: "center",
        alignItems: "center",
      },
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
      
      modalView: {
        width: windowWidth * 0.8,
        height: windowHeight * 0.5,
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