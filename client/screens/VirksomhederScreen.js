import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, TextInput } from "react-native";
import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

// MODAL
import BookMeetingModal from "../components/bookMeetingModal";

// ICONS
import { AntDesign } from '@expo/vector-icons';

const VirksomhederScreen = () => {
  const { theme } = useContext(ThemeContext); 

  const [virksomheder, setVirksomheder] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});

  //MODAL
  const [bookModalVisible, setBookModalVisible] = useState(true);

  useEffect(() => {
    fetch("https://messe-app-server.onrender.com/users/allVirksomheder", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setVirksomheder(data);
        setFilteredData(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleSearch = (text) => {
    setQuery(text);
    filterData(text);
  };

  const filterData = (searchQuery) => {
    const formattedQuery = searchQuery.toLowerCase();
    const newData = virksomheder.filter((item) =>
      item.name && item.name.toLowerCase().includes(formattedQuery)
    );
    setFilteredData(newData);
  };

  return (
    <SafeAreaView style={[styles.safeAreaViewContainer, {backgroundColor: theme.backgroundColor}]}>
      <View style={styles.mainContainer}>
        <View>
          <Text style={[styles.BookVirksomhedText, {color: theme.textColor}]}>Book et møde</Text>
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
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.itemContainer}
              onPress={() => {
                setSelectedItem(item);
                setBookModalVisible(true);
               
              }}
            >
              <View style={[styles.virksomhederBox, {backgroundColor: theme.subBackgroundColor}]}>
                <View>
                <Text style={[styles.virksomhedName, {color: theme.textColor}]}>{item.name}</Text>
                </View>
                <View>
                <AntDesign name="plus" size={15} color={theme.textColor} />
                </View>
              </View>
            </TouchableOpacity>
          )}
        /> 
      </View>
      <BookMeetingModal bookModalVisible={bookModalVisible} setBookModalVisible={setBookModalVisible} selectedItem={selectedItem} />
    </SafeAreaView>
  );
};

export default VirksomhederScreen;

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
  },
  mainContainer: {
    paddingTop: 50,
    paddingLeft: 35,
    paddingRight: 35,
  },
  virksomhederContainer: {},
  virksomhederBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 5,
    padding: 15,
    marginTop: 10,
    marginHorizontal: 2,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
  virksomhedName: {},
  searchInput: {
    fontSize: 16,
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
  },
  BookVirksomhedText: {
    fontWeight: "bold",
    marginTop: 5,
    fontSize: 32,
  },
  itemContainer: {
    marginTop: 10,
  },
});
