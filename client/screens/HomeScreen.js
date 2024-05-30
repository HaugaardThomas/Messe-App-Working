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
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';

// Image
import img1 from "../assets/images/Shop_transparent.png";
import arrowCloseButton from "../assets/images/Arrow_close_button.png";

// Modal
import StandeModal from "../components/standeModal";

const categories = ["All", "test1", "test2", "test3"];

const HomeScreen = () => {
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredData, setFilteredData] = useState(data);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetch("https://messe-app-server.onrender.com/messer/getAllMesser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setFilteredData(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  if (loading) {
    return (
      <SafeAreaView>
        <Text>LOADING</Text>
      </SafeAreaView>
    );
  }


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
      item.title && item.title.toLowerCase().includes(formattedQuery)
    );
  }

  setFilteredData(newData);
};


  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.safeAreaViewContainer}>
        <View style={styles.mainContainer}>
          <View>
            <Text style={styles.velkommenText}>Velkommen 👋</Text>
            <Text style={styles.messeNavn}>Navn Messe</Text>
          </View>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            clearButtonMode="always"
            value={query}
            onChangeText={handleSearch}
            placeholder="Search..."
            style={styles.searchInput}
          />
          <ScrollView
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
                      styles.categoryButtonTextSelected,
                  ]}
                >
                  {category}
                </Text>
                {selectedCategory === category && (
                  <View style={styles.dotContainer}>
                    <View style={styles.selectedCategoryDot} />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
           <FlatList
            data={filteredData}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => {
                  setSelectedItem(item);
                  setModalVisible(true);
                }}
              >
                <View style={styles.itemContainer}>
                  <View style={styles.imageContainer}>
                    <Image source={{ uri: item.image }} style={styles.itemImage} />
                  </View>
                  <Text style={styles.itemText}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            )}
            numColumns={2}
            contentContainerStyle={styles.list}
          /> 
         <StandeModal modalVisible={modalVisible} setModalVisible={setModalVisible} selectedItem={selectedItem} setSelectedItem={setSelectedItem}/>
        </View>
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  mainContainer: {
    paddingTop: 100,
    paddingLeft: 35,
    paddingRight: 35,
  },
  velkommenText: {
    fontSize: 24,
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
  },
  itemContainer: {
    backgroundColor: "#F4F4F4",
    flex: 1,
    marginHorizontal: 7,
    marginVertical: 15,
    borderRadius: 15,
    flexDirection: "column",
    flexWrap: "wrap",
    paddingHorizontal: 10,
    width: "50%",
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
  modalImage: {
    width: 300,
    height: 200,
    marginBottom: 15,
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
    alignContent: "center",
    alignItems: "center",
    marginLeft: 20,
    marginTop: -30,
  },
  itemImage: {
    width: 150,
    height: 100,
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
  },
  categoryButton: {
    padding: 10,
    paddingLeft: 5,
    marginHorizontal: 5,
    backgroundColor: "white",
    borderRadius: 18,
  },
  categoryButtonSelected: {
    backgroundColor: "white",
  },
  categoryButtonText: {
    color: "lightgrey",
    fontSize: 17,
  },
  categoryButtonTextSelected: {
    color: "black",
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
    backgroundColor: "black",
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
