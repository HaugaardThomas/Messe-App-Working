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
    Modal,
    Dimensions,
    ImageBackground,
  } from "react-native";
  import React, { useState, useEffect, useContext } from "react";
  import { useNavigation } from '@react-navigation/native';
  
  // Image
  import img1 from "../assets/images/Shop_transparent.png";
  import arrowCloseButton from "../assets/images/Arrow_close_button.png";
  
  // Modal
  import StandeModal from "../components/standeModal";
  import NotificationModal from "../components/notificationModal";
  import BookMeetingModal from "../components/bookMeetingModal";
  import ProgramModal from "../components/programModal";
  
   // CONTEXT
   import { ThemeContext } from "../context/ThemeContext";
  
   // ICONS
   import { Ionicons } from '@expo/vector-icons';
  
  const categories = ["All", "test1", "test2", "test3"];
  
  const ProgramScreen = () => {
    const navigation = useNavigation();
  
    // DARKMODE
    const { theme, toggleTheme } = useContext(ThemeContext); 
  
    const [programModalVisible, setProgramModalVisible] = useState(true);  
    const [selectedProgramItem, setSelectedProgramItem] = useState({});
  
    const [query, setQuery] = useState("");
    const [data, setData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [filteredData, setFilteredData] = useState(data);
    const [loading, setLoading] = useState(true);
  
    const [testVisible, setTestVisible] = useState(true);
  
    const [notificationModalVisible, setNotificationModalVisible] = useState(false);
  
   
    
  
    useEffect(() => {
      fetch("https://messe-app-server.onrender.com/program/getAllPrograms", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // Construct the full URL for each image
          const updatedData = data.map(item => ({
            ...item,
            image: `https://messe-app-server.onrender.com${item.image}`
          }));
          setData(updatedData);
          setFilteredData(updatedData);
          setLoading(false);
          
        })
        .catch((error) => console.error("Error:", error));
    }, []);
  
  
  
    
  
    
  
  
    const handleSearch = (text) => {
      setQuery(text);
      filterData(text, selectedCategory);
    };
  
    const selectCategory = (category) => {
      setSelectedCategory(category);
      filterData(query, category);
    };
  
    const filterData = (searchQuery, category) => {
    let newData = [...data]; // Create a new array based on the original data
  
    if (category !== "All") {
      newData = newData.filter((item) => item.category === category);
    }
  
    if (searchQuery) {
      const formattedQuery = searchQuery.toLowerCase();
      newData = newData.filter((item) =>
        item.name &&
      item.name &&
      item.name.toLowerCase().includes(formattedQuery)
      );
    }
  
    setFilteredData(newData);
  };
  
  
    return (
      <>
        <SafeAreaView style={styles.safeAreaViewContainer}>
          <View style={styles.mainContainer}>
          <View style={styles.bookMainTitleContainer}> 
            <Text style={[styles.bookMainTitle, {color: theme.textColor}]}>Program</Text>
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
            {/* KATEGORI FILTER */}
            {/* <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryContainer}
            >
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryButton,
                    selectedCategory === category &&
                      styles.categoryButtonSelected,
                  ]}
                  onPress={() => selectCategory(category)}
                >
                  <Text
                    style={[
                      styles.categoryButtonText,
                      selectedCategory === category &&
                      {color: theme.textColor},
                    ]}
                  >
                    {category}
                  </Text>
                  {selectedCategory === category && (
                    <View style={styles.dotContainer}>
                      <View style={[styles.selectedCategoryDot, {backgroundColor: theme.textColor}]} />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView> */}
  
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View>
    {filteredData.map((item) => (
      <TouchableOpacity
        key={item._id}
        style={[styles.itemTouchContainer, {backgroundColor: theme.backgroundColor}]}
        onPress={() => {
            setSelectedProgramItem(item);
          setProgramModalVisible(true);
        }}
      >
          <ImageBackground  imageStyle={{ borderRadius: 15}} style={styles.imageItemBackground} source={{ uri: item.image}}>
          <View style={styles.itemProgramTimeContainer}>
                    <Text style={styles.itemProgramTimeText}>{item.time}</Text>
                  </View>
                  <View style={styles.itemProgramNameContainer}>
                    <Text style={[styles.itemProgramText, { color: "white" }]}>
                    {item.name}
                    </Text>
                  </View>
            {/* <View style={styles.itemTextNameContainer}>
              <Text style={[styles.itemTextName, {color: "white"}]}>
                {item.name}
              </Text>
            </View> */}
          </ImageBackground>
      </TouchableOpacity>
    ))}
      <View style={styles.bottomSpacer}><Text></Text></View>
  </View>
  </ScrollView>
          
  
         
          </View>
          <ProgramModal    
           programModalVisible={programModalVisible}
           setProgramModalVisible={setProgramModalVisible}
           selectedProgramItem={selectedProgramItem}/>
           <NotificationModal notificationModalVisible={notificationModalVisible} setNotificationModalVisible={setNotificationModalVisible} />
           <BookMeetingModal testVisible={testVisible} setTestVisible={setTestVisible}/>
        </SafeAreaView>
      </>
    );
  };
  
  export default ProgramScreen;
  
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  
  const styles = StyleSheet.create({
    bottomSpacer: {
      marginTop: 230, 
    },
    scrollViewContent: {
      flexGrow: 1,
      marginBottom: 50,
      paddingBottom: 50,
    },
    safeAreaViewContainer: {
      flex: 1,
      // backgroundColor: "white",
    },
    mainContainer: {
      paddingLeft: 35,
      paddingRight: 35,
    },
    bookMainTitleContainer: {
      marginTop: 50,
    },
    bookMainTitle: {
      fontWeight: "bold",
      fontSize: 32,
    },
    velkommenText: {
      fontSize: 24,
      paddingTop: 100,
    },
    messeNavn: {
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
      marginTop: 25,
      borderRadius: 15,
      flexDirection: "column",
      flexWrap: "wrap",
      // width: "50%",
      width: "100%",
      height: windowHeight * 0.3,
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
      justifyContent: 'flex-end',
  
    },
    itemProgramTimeContainer: {
        position: "absolute",
        top: 10, 
        left: 10, 
        backgroundColor: "rgba(0, 0, 0, 0.5)", 
        borderRadius: 5,
        padding: 5,
      },
      itemProgramTimeText: {
        color: "white",
        fontWeight: "bold",
      },
      itemProgramNameContainer: {
        backgroundColor: "rgba(0, 0, 0, 0.4)", 
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
      },
      itemProgramText: {
        fontSize: 16,
        fontWeight: "bold",
      },
        // itemTextNameContainer: {
    //   backgroundColor: 'rgba(0, 0, 0, 0.4)', 
    //   paddingVertical: 10,
    //   paddingHorizontal: 15,
    //   borderBottomLeftRadius: 15,
    //   borderBottomRightRadius: 15,
    // },
    // itemTextName: {
    //   fontSize: 16,
    //   fontWeight: 'bold',
    // },
    // Modal
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalView: {
      width: windowWidth * 0.9,
      height: windowHeight * 0.91,
      marginTop: 45,
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
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
    // Modal Image
    modalImageContainer: {
      marginTop: 20,
      width: "100%",
      alignItems: "center",
    },
    modalImage: {
      width: "100%",
    },
    // Button
    modalCloseButton: {
      position: "absolute",
      left: 10,
      top: 10,
      borderRadius: 20,
      padding: 5,
      elevation: 2,
      backgroundColor: "black",
    },
    textCloseButton: {
      color: "white",
    },
    // Title and text content
    modalTextTitle: {
      fontSize: 24,
      fontWeight: "bold",
    },
    modalTextBody: {},
    // Image
    imageContainer: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden", // Ensure the image doesn't overflow the container
      borderRadius: 15,  // Match the radius of the container for better visual appeal
    },
    itemImage: {
      width: "100%",
      height: 150, // Adjust the height as needed
      resizeMode: "fit", // Cover the entire container while maintaining the aspect ratio
    },
    // Vis mere / mindre tekst
    readMoreText: {
      color: 'black',
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: 10,
    },
    // Category selector
    categoryContainer: {
      flexDirection: "row",
      marginTop: 10,
      marginBottom: 0,
      height: 50,
      marginBottom: 10,
    },
    categoryButton: {
      padding: 10,
      paddingLeft: 5,
      marginHorizontal: 5,
      // backgroundColor: "white",
      borderRadius: 18,
    },
    categoryButtonSelected: {
      // backgroundColor: "white",
    },
    categoryButtonText: {
      color: "lightgrey",
      fontSize: 17,
    },
    categoryButtonTextSelected: {
      //  color: "black",
    },
    // DOT
    dotContainer: {
      height: 5,
      justifyContent: "center",
      alignItems: "center",
    },
    selectedCategoryDot: {
      height: 5,
      width: 5,
      borderRadius: 50,
      //backgroundColor: "black",
      position: "absolute",
      bottom: 0,
    },
    // Find Stand knap
    standRedirectKnapContainer: {
      alignItems: 'center',
      marginTop: 25,
    },
    standRedirectKnapOuterBorder: {
      borderRadius: 25,
      padding: 2,
      borderWidth: 3,
    },
    standRedirectKnapTouch: {
      backgroundColor: 'black',
     borderRadius: 25,
    },
    standRedirectKnapText: {
    color: 'white',
    fontWeight: 'bold',
      paddingVertical: 10,
      paddingHorizontal: 25,
    },
  });
  