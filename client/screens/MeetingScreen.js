import {
    View,
    Text,
    StyleSheet,
    Image,
    SafeAreaView,
    TouchableOpacity,
    Modal,
    Dimensions,
    StatusBar
  } from "react-native";
  import React, { useState, useEffect } from "react";

  import AsyncStorage from "@react-native-async-storage/async-storage";

  import { useNavigation } from "@react-navigation/native";

  import axios from "axios";

const MeetingScreen = () => {
    const [data, setData] = useState([]);

    const userId =  AsyncStorage.getItem("userID");

    useEffect(() => {
        fetch(`https://messe-app-server.onrender.com/users/user/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setData(data);
          })
          .catch((error) => console.error("Error:", error));
      }, []);
    


    return(
        <>
        <SafeAreaView style={styles.safeAreaViewContainer}>
        <View style={styles.mainContainer}>
            <Text>MeetingScreen</Text>
        </View>
        </SafeAreaView>
        </>
    )
}

export default MeetingScreen;

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

});