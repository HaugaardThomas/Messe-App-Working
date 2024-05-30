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
  import { useLogin } from "../context/LoginProvider";

const BookStandScreen = () => {


    return(
        <>
        <StatusBar style="dark" />
        <SafeAreaView style={styles.safeAreaViewContainer}>
        <View style={styles.mainContainer}>
        <View>
            <Text>Book stand</Text>
        </View>
        </View>
        </SafeAreaView>
        </>
    )
}

export default BookStandScreen;

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
})