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
import { useNavigation } from "@react-navigation/native";

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
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = () => {
  const navigation = useNavigation();

  // DARKMODE
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [programModalVisible, setProgramModalVisible ] = useState(false);
  const [selectedStandItem, setSelectedStandItem] = useState({});
  const [selectedProgramItem, setSelectedProgramItem ] = useState({});

  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
  const [loading, setLoading] = useState(true);
  const [virksomhedId, setVirksomhedId] = useState(null);

  const [testVisible, setTestVisible] = useState(true);

  const [notificationModalVisible, setNotificationModalVisible] = useState(false);

  const [programs, setPrograms] = useState([]); 
  const [filteredPrograms, setFilteredPrograms] = useState(programs);

  useEffect(() => {
    // Fetch Messe data
    fetch("https://messe-app-server.onrender.com/messer/getAllMesser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedData = data.map((item) => ({
          ...item,
          image: `https://messe-app-server.onrender.com${item.image}`,
        }));
        setData(updatedData);
        setFilteredData(updatedData);
        setLoading(false);

        if (data.length > 0) {
          setVirksomhedId(data[0].virksomhed);
        }
      })
      .catch((error) => console.error("Error:", error));

    // Fetch Program data
    fetch("https://messe-app-server.onrender.com/program/getAllPrograms", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedData = data.map((item) => ({
          ...item,
          image: `https://messe-app-server.onrender.com${item.image}`,
        }));
        setPrograms(updatedData);
        setFilteredPrograms(updatedData);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleSearch = (text) => {
    setQuery(text);
    filterData(text);
    filterPrograms(text);
  };

  const filterData = (searchQuery) => {
    let newData = [...data];

    if (searchQuery) {
      const formattedQuery = searchQuery.toLowerCase();
      newData = newData.filter(
        (item) =>
          item.virksomhed &&
          item.virksomhed.name &&
          item.virksomhed.name.toLowerCase().includes(formattedQuery)
      );
    }

    setFilteredData(newData);
  };

  const filterPrograms = (searchQuery) => {
    let newPrograms = [...programs];

    if (searchQuery) {
      const formattedQuery = searchQuery.toLowerCase();
      newPrograms = newPrograms.filter(
        (item) =>
          item.name &&
          item.name.toLowerCase().includes(formattedQuery)
      );
    }

    setFilteredPrograms(newPrograms);
  };

  return (
    <>
      <SafeAreaView style={styles.safeAreaViewContainer}>
        <View style={styles.mainContainer}>
          <View style={styles.headerContainer}>
            <View style={styles.bellContainer}>
              <TouchableOpacity
                onPress={() => {
                  setNotificationModalVisible(true);
                }}
              >
                <Ionicons
                  style={styles.bellIcon}
                  name="notifications"
                  size={24}
                  color={theme.textColor}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text style={[styles.velkommenText, { color: theme.textColor }]}>
              Velkommen til👋
            </Text>
            <Text style={[styles.messeNavn, { color: theme.textColor }]}>
              Byg og bæredygtighed
            </Text>
          </View>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            clearButtonMode="always"
            value={query}
            onChangeText={handleSearch}
            placeholder="Search..."
            placeholderTextColor={theme.textColor}
            style={[
              styles.searchInput,
              {
                backgroundColor: theme.subBackgroundColor,
                color: theme.textColor,
              },
            ]}
          />

          <View style={styles.standVirksomhedTitleAllContainer}>
            <View style={styles.standeVirksomhedViewContainer}>
              <Text style={styles.standeVirksomhedText}>
                Stande/Virksomheder
              </Text>
            </View>
            <View style={styles.seeAllContainer}>
              <TouchableOpacity 
              onPress={() => {
                navigation.navigate("VirksomhederScreen");
              }}
              >
                <Text style={styles.seeAllText}>Se Alle</Text>
              </TouchableOpacity>
              
            </View>
          </View>

          <FlatList
            horizontal
            data={filteredData}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.itemTouchContainer,
                  { backgroundColor: theme.backgroundColor },
                ]}
                onPress={() => {
                  setSelectedStandItem(item);
                  setModalVisible(true);
                }}
              >
                <ImageBackground
                  imageStyle={{ borderRadius: 15 }}
                  style={styles.imageItemBackground}
                  source={{ uri: item.image }}
                >
                  <View style={styles.itemTextNameContainer}>
                    <Text style={[styles.itemTextName, { color: "white" }]}>
                      {item.virksomhed.name}
                    </Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            )}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContent}
          />

       {/* Program Section */}
       <View style={styles.standVirksomhedTitleAllContainer}>
            <View style={styles.standeVirksomhedViewContainer}>
              <Text style={styles.standeVirksomhedText}>
                Program/Talks
              </Text>
            </View>
            <View style={styles.seeAllContainer}>
            <TouchableOpacity 
              onPress={() => {
                navigation.navigate("ProgramScreen");
              }}
              >
              <Text style={styles.seeAllText}>Se Alle</Text>
              </TouchableOpacity>
            </View>
          </View>

          <FlatList
            horizontal
            data={filteredPrograms}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.itemProgramTouchContainer,
                  { backgroundColor: theme.backgroundColor },
                ]}
                onPress={() => {
                  setSelectedProgramItem(item);
                  setProgramModalVisible(true);
                }}
              >
                <ImageBackground
                  imageStyle={{ borderRadius: 15 }}
                  style={styles.imageProgramBackground}
                  source={{ uri: item.image }}
                >
                  <View style={styles.itemProgramTimeContainer}>
                    <Text style={styles.itemProgramTimeText}>{item.time}</Text>
                  </View>
                  <View style={styles.itemProgramNameContainer}>
                    <Text style={[styles.itemProgramText, { color: "white" }]}>
                    {item.name}
                    </Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            )}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContent}
          />

        </View>
        <StandeModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          selectedStandItem={selectedStandItem}
          setSelectedStandItem={setSelectedStandItem}
        />
        <NotificationModal
          notificationModalVisible={notificationModalVisible}
          setNotificationModalVisible={setNotificationModalVisible}
        />
        <BookMeetingModal
          testVisible={testVisible}
          setTestVisible={setTestVisible}
        />
        <ProgramModal 
        programModalVisible={programModalVisible}
        setProgramModalVisible={setProgramModalVisible}
        selectedProgramItem={selectedProgramItem}
        setSelectedProgramItem={setSelectedProgramItem}
        />
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const itemWidth = windowWidth * 0.4;

const styles = StyleSheet.create({
  scrollViewContent: {},
  safeAreaViewContainer: {
    flex: 1,
    // backgroundColor: "white",
  },

  mainContainer: {
    paddingLeft: 35,
    paddingRight: 35,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingTop: 10,
  },
  bellContainer: {},
  bellIcon: {},
  velkommenText: {
    fontSize: 22,
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
  // TITLE
  standVirksomhedTitleAllContainer: {
    flexDirection: "row",
    marginHorizontal: 5,
    justifyContent: "space-between",
    marginTop: 25,
  },
  standeVirksomhedViewContainer: {},
  standeVirksomhedText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  seeAllContainer: {},
  seeAllText: {
    textDecorationLine: "underline",
  },
  // LIST
  horizontalItemContainer: {},
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
    width: 250,
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
  // PROGRAM
  itemProgramTouchContainer: {
    marginTop: 15,
    borderRadius: 15,
    marginHorizontal: 5,
    width: 250,
    height: windowHeight * 0.2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    elevation: 5,
  },
  imageProgramBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    position: "relative", 
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
    borderRadius: 15, // Match the radius of the container for better visual appeal
  },
  itemImage: {
    width: "100%",
    height: 150, // Adjust the height as needed
    resizeMode: "fit", // Cover the entire container while maintaining the aspect ratio
  },
  // Vis mere / mindre tekst
  readMoreText: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
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
    alignItems: "center",
    marginTop: 25,
  },
  standRedirectKnapOuterBorder: {
    borderRadius: 25,
    padding: 2,
    borderWidth: 3,
  },
  standRedirectKnapTouch: {
    backgroundColor: "black",
    borderRadius: 25,
  },
  standRedirectKnapText: {
    color: "white",
    fontWeight: "bold",
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
});
