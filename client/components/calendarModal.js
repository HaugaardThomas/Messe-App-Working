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
  

  import AsyncStorage from "@react-native-async-storage/async-storage";

  // Image
  import img1 from "../assets/images/Shop_transparent.png";
  import arrowCloseButton from "../assets/images/Arrow_close_button.png";

    // CONTEXT
 import { ThemeContext } from "../context/ThemeContext";

 // ICONS 
 import { Ionicons } from '@expo/vector-icons';
  


const CalendarModal = ({calendarModalVisible, setCalendarModalVisible, user }) => {
    const navigation = useNavigation();

    const [selectedItem, setSelectedItem] = useState({});
    const [query, setQuery] = useState("");
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState(data);
    const [appointments, setAppointments] = useState([]);

       // DARKMODE
       const { theme, toggleTheme } = useContext(ThemeContext); 


       const handleSearch = (text) => {
        setQuery(text);
        filterData(text);
      };
    
      const filterData = (searchQuery, category) => {
      let newData = [...data]; // Create a new array based on the original data
    
      if (category !== "All") {
        newData = newData.filter((item) => item.category === category);
      }
    
      if (searchQuery) {
        const formattedQuery = searchQuery.toLowerCase();
        newData = newData.filter((item) =>
          item.title && item.title.toLowerCase().includes(formattedQuery)
        );
      }
    
      setFilteredData(newData);
    };



    useEffect(() => {
      const fetchUserIdAndAppointments = async () => {
        try {
          const userId = await AsyncStorage.getItem("userID");
          if (userId) {
            fetch(`https://messe-app-server.onrender.com/appointment/appointments/user/${userId}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((response) => response.json())
              .then((data) => {
                setAppointments(data);
              })
              .catch((error) => console.error("Error:", error));
          } else {
            console.error("User ID not found");
          }
        } catch (error) {
          console.error("Failed to fetch user ID:", error);
        }
      };
  
      fetchUserIdAndAppointments();
    }, []);


    
  

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
     onSwipeComplete={() => setCalendarModalVisible(false)}
        isVisible={calendarModalVisible}
        onRequestClose={() => {
            setCalendarModalVisible(!calendarModalVisible);
        }}
        style={styles.cardModal}
      >
         <View style={[styles.centeredView, {backgroundColor: theme.backgroundColor}]}>
         <View style={[styles.modalView, {backgroundColor: theme.backgroundColor}]}>
         
         
          <View style={styles.goBackContainer}>
            <TouchableOpacity onPress={() => setCalendarModalVisible(!calendarModalVisible)}>
            <Ionicons  name="chevron-back" size={24} color={theme.textColor} />
            </TouchableOpacity>
          </View>
           

           <View style={styles.mainContentContainer}>

            <View style={styles.titleContainer}>
                <Text style={[styles.hejUserText, {color: theme.textColor}]}>Hej {user} 👋</Text>
                <Text style={[styles.titleText, {color: theme.textColor}]}>Bookede Møder</Text>
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
            <View style={styles.flatlistContainer}>
            <FlatList
        data={appointments}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.virksomhed.name}</Text>
          </View>
        )}
      />
            </View>

           </View>
    
          </View>
        </View>
      </Modal>
      </>
    )

}

export default CalendarModal;

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
  mainContentContainer: {},
  titleContainer: {
    paddingTop: 100,
  },
  hejUserText: {
    fontSize: 24,
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 32,
    marginTop: 5,
  },
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
  flatlistContainer: {},

})