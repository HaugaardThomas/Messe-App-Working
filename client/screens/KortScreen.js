import { View, Text, StyleSheet, Image, SafeAreaView, FlatList, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";


const KortScreen = () => {
    const [virksomheder, setVirksomheder] = useState([]);
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
          })
          .catch((error) => console.error("Error:", error));
      }, []);

    return (
        <>
        <SafeAreaView style={styles.safeAreaViewContainer}>
        <View style={styles.mainContainer}>
          <FlatList
            data={virksomheder}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => {
                  setSelectedItem(item);
                  setModalVisible(true);
                }}
              >
                <View style={styles.virksomhederContainer}>
                <View style={styles.virksomhederBox}>
                <Text style={styles.virksomhedName}>{item.name}</Text>
                </View>
            </View>
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.list}
          /> 
        </View>
        </SafeAreaView>
</>
    );
}

export default KortScreen;


const styles = StyleSheet.create({
    safeAreaViewContainer: {
        flex: 1,
        backgroundColor: "f4f4f4",
      },
      mainContainer: {
        paddingTop: 50,
        paddingLeft: 35,
        paddingRight: 35,
      },
      virksomhederContainer: {
        
      },
      virksomhederBox: {
        backgroundColor: 'lightgrey',
        borderRadius: 25,
        padding: 15,
        marginTop: 10
      },
      virksomhedName: {

      },



});