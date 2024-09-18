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

  // Modal
  import BookedMeetingPopupModal from "../components/bookedMeetingPopupModal";

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

    // Popup modal
    const [popUpModal, setPopUpModal] = useState(false);

       // DARKMODE
       const { theme, toggleTheme } = useContext(ThemeContext); 

       const [isBookable, setIsBookable] = useState(true);

        // State for selected time
        const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
        const [appointmentTime, setAppointmentTime] = useState('');
        const [responseMessage, setResponseMessage] = useState('');

    // Hent user ID
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

  // Fetch available time slots for the selected virksomhed
  useEffect(() => {


    // const virksomhedId = "66ea99ccb75bcad86618e9ca";
   
    if (virksomhedId) {
      const fetchTimeSlots = async () => {
        try {
          const response = await fetch(`https://messe-app-server.onrender.com/users/virksomhed/${virksomhedId}/available-times`);
          
          if (!response.ok) {
            const errorText = await response.text();
            console.error("Error from server:", errorText);
            throw new Error(`Server responded with status: ${response.status}`);
          }

          const data = await response.json();
          setAvailableTimeSlots(data.timeSlots);
        } catch (error) {
          console.error("Error fetching available time slots:", error);
        }
      };
  
      fetchTimeSlots();
    }
  }, [virksomhedId]);


  // Book appointment
  const makeAppointment = async () => {
      if (!isBookable) return; // Prevent booking if slot is not available

      // const virksomhedIdString = virksomhedId._id;
      // virksomhedId = virksomhedId._id;

      console.log("User ID", userId);
      console.log("Virksomhed ID", virksomhedId);
      console.log("Appointment tid", appointmentTime);

      try {
          const response = await fetch('https://messe-app-server.onrender.com/appointment/set/appointment', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  userId: await AsyncStorage.getItem("userID"),
                  virksomhedId,
                  appointmentTime,
              }),
          });

          const data = await response.json();
          setResponseMessage(data.message);
          setBookModalVisible(false);
          setModalVisible(false);
          navigation.navigate("BookedeMeetingsScreen", { showModal: true });
      } catch (error) {
          console.error("Error booking appointment:", error);
      }
  };
     // Handle appointment time selection
const handleTimeChange = (selectedTime) => {
  setAppointmentTime(selectedTime);

  // Check if the selected time is booked or if the user selected the placeholder
  if (selectedTime === 'Vælg Tid' || availableTimeSlots.find(slot => slot.time === selectedTime)?.isBooked) {
      setIsBookable(false); // Disable booking
  } else {
      setIsBookable(true); // Enable booking for available time slots
  }
};

return (
  <>
    <Modal
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
      <View style={[styles.modalView, { backgroundColor: theme.subBackgroundColor }]}>
        <View style={styles.goBackContainer}>
            <TouchableOpacity onPress={() => setBookModalVisible(!bookingModalVisible)}>
              <AntDesign name="closecircle" size={24} color={theme.textColor} />
            </TouchableOpacity>
        </View>

        <Text style={[styles.modalTitle, { color: theme.textColor }]}>Vælg en tid</Text>

        <Picker
          selectedValue={appointmentTime}
          onValueChange={handleTimeChange}  // Ensure this handler is called
          style={styles.picker}
        >
          {/* Placeholder option */}
          <Picker.Item label="Vælg Tid" value="Vælg Tid" color="gray" />
          
          {availableTimeSlots.map((slot) => (
            <Picker.Item
              key={slot.time} // Access the 'time' property for the key
              label={slot.time} // Access the 'time' property for the label
              value={slot.time} // Access the 'time' property for the value
              color={slot.isBooked ? 'red' : 'black'} // If the slot is booked, show it in red
            />
          ))}
        </Picker>

        <TouchableOpacity 
          disabled={!isBookable} // Disable button if the slot is not bookable or "Vælg Tid" is selected
          style={[styles.standBookKnapTouchBook, { backgroundColor: isBookable ? theme.textColor : 'grey' }]}
        >
          <Text onPress={makeAppointment} style={[styles.standBookTextBook, { color: theme.backgroundColor }]}>
            Book
          </Text>
        </TouchableOpacity>
      </View>
    
      <BookedMeetingPopupModal popUpModal={popUpModal} setPopUpModal={setPopUpModal} />
    </Modal>
  </>
);
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
        picker: {
          marginTop: 0,
          paddingTop: 0,
      },
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