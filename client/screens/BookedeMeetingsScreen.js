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
    ImageBackground,
  } from "react-native";
  import React, { useState, useEffect, useContext } from "react";
  import { useNavigation, useFocusEffect  } from '@react-navigation/native';
  import Modal from 'react-native-modal';
  

  import AsyncStorage from "@react-native-async-storage/async-storage";

  // Image
  import img1 from "../assets/images/Shop_transparent.png";
  import arrowCloseButton from "../assets/images/Arrow_close_button.png";

    // CONTEXT
 import { ThemeContext } from "../context/ThemeContext";

 // ICONS 
 import { Ionicons } from '@expo/vector-icons';

 import { useRoute } from '@react-navigation/native';

 import BookedMeetingPopupModal from "../components/bookedMeetingPopupModal";
  


const BookedeMeetingsScreen = ({calendarModalVisible, setCalendarModalVisible }) => {
  const route = useRoute();
    const navigation = useNavigation();

    const [popUpModal, setPopUpModal] = useState(false);

    const [user, setUser] = useState("");

    const [selectedItem, setSelectedItem] = useState({});
    const [query, setQuery] = useState("");
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState(data);
    const [appointments, setAppointments] = useState([]);

       // DARKMODE
       const { theme, toggleTheme } = useContext(ThemeContext); 

       useEffect(() => {
        if (route.params?.showModal) {
          console.log("modal opening");
          
        
          setTimeout(() => {
            setPopUpModal(true);
      
            
            setTimeout(() => {
              setPopUpModal(false);
            }, 2000);  
      
          }, 1000); 
        }
      }, [route.params?.showModal]);


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



    useFocusEffect(
      React.useCallback(() => {
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
      }, [])
    );

    // Hent username
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem("username");
        if (storedUsername) {
          setUser(storedUsername);
        }
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };

    fetchUsername();
  }, []);


    
  

    return ( 
      <SafeAreaView
      style={[
        styles.safeAreaViewContainer,
        { backgroundColor: theme.backgroundColor },
      ]}
    >
     
       <View style={styles.mainContainer}>
 
       <View style={styles.nameAndBookContainer}>
              <View>
                <Text style={[styles.hejUserText, {color: theme.textColor}]}>Hej {user} 👋</Text>
                </View>
                <View style={styles.bookMeetingContainer}>
                  <TouchableOpacity 
                  onPress={() => {
                    navigation.navigate("VirksomhederScreen");
                    setCalendarModalVisible(false);
                  }}
                  >
                  <Text style={styles.bookMeetingText}>Book et møde</Text>
                  </TouchableOpacity>
                </View>
            </View>
            <Text style={[styles.titleText, {color: theme.textColor}]}>Bookede Møder</Text>

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
             showsVerticalScrollIndicator={false}
        data={appointments}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
        <TouchableOpacity
        style={[styles.itemTouchContainer, {backgroundColor: theme.subBackgroundColor}]}
        onPress={() => {
          // setSelectedItem(item);
          // setModalVisible(true);
        }}
        >
          <ImageBackground
                  imageStyle={{ borderRadius: 15 }}
                  style={styles.imageItemBackground}
                  // source={{ uri: item.image }}
                >
                  <View style={styles.itemMainFlexContainer}>
                  <View style={styles.itemProgramTimeContainer}>
                    <Text style={styles.itemProgramTimeText}>{item.appointmentTime}</Text>
                  </View>
                  <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("StandScreen", { selectedItem: item });
                    setSelectedItem(item);
                  }}
                  >
                  <View style={styles.itemFindStandButtonContainer}>
                    <Text style={styles.itemFindStandButtonText}>Find Stand</Text>
                  </View>
                  </TouchableOpacity>
                  </View>
                  <View style={styles.itemTextNameContainer}>
                    <Text style={[styles.itemTextName, { color: "white" }]}>
                      {item.virksomhed.name}
                    </Text>
                  </View>
                </ImageBackground>
          </TouchableOpacity>
        )}
      />


      
            </View>

      

     

            <BookedMeetingPopupModal popUpModal={popUpModal} setPopUpModal={setPopUpModal} />
      </View>
      
    </SafeAreaView>
    )

}

export default BookedeMeetingsScreen;

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;


const styles = StyleSheet.create({
 // Modal
 safeAreaViewContainer: {
  flex: 1,
  // backgroundColor: "white",
},

mainContainer: {
  paddingLeft: 35,
  paddingRight: 35,
},
nameAndBookContainer: {
  paddingTop: 100,
  flexDirection: "row",
  justifyContent: "space-between"
},
  hejUserText: {
    fontSize: 24,
  },
  bookMeetingContainer: {
    justifyContent: "center",
  },
  bookMeetingText: {
    color: "blue",
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
    marginBottom: 20,
  },
  flatlistContainer: {},
  itemContainerTouch: {
    padding: 15,
    borderRadius: 25,
  },
  // LIST
  list: {
    marginTop: 10,
  },
  itemText: {
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 15,
    overflow: "hidden",
    fontSize: 20,
  },
  itemTouchContainer: {
    marginTop: 15,
    borderRadius: 15,
    marginHorizontal: 5,
    width: "100%",
    height: windowHeight * 0.2,
    // BOX SHADOW
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    elevation: 5,
  },
  // IMAGE BACKGROUND
  imageItemBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    position: "relative", 
  },
  itemMainFlexContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 5,
    position: "absolute",
    top: 10,
    width: "100%",
  },
  itemProgramTimeContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", 
    borderRadius: 5,
    padding: 5,
  },
  itemProgramTimeText: {
    color: "white",
    fontWeight: "bold",
  },
  itemFindStandButtonContainer: {
    backgroundColor: "black", 
    borderRadius: 5,
    padding: 5,
    marginRight: 5,
  },
  itemFindStandButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  itemTextNameContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  itemTextName: {
    fontSize: 16,
    fontWeight: "bold",
  },
 
})