import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, TextInput } from "react-native";
import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const VirksomhederScreen = () => {
  const { theme } = useContext(ThemeContext); 

  const [virksomheder, setVirksomheder] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});

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
               
              }}
            >
              <View style={[styles.virksomhederBox, {backgroundColor: theme.subBackgroundColor}]}>
                <Text style={[styles.virksomhedName, {color: theme.textColor}]}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
        /> 
      </View>
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
    backgroundColor: 'lightgrey',
    borderRadius: 25,
    padding: 15,
    marginTop: 10,
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
