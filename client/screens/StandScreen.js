import { View, Text, StyleSheet, Image, SafeAreaView, Button } from "react-native";


import {useState} from 'react';

import BottomSheet from "../components/bottomSheet";

import { Ionicons } from '@expo/vector-icons';

import { useRoute } from '@react-navigation/native';


const StandScreen = () => {
  const route = useRoute();


  const { selectedItem } = route.params || {};

 

    return (
        <>
        <SafeAreaView style={styles.safeAreaViewContainer}>
        <View style={styles.mainContainer}>
            
        </View>
        </SafeAreaView>

        <BottomSheet>
        <View style={styles.bottomSheetMainContainer}>
          <View style={styles.handleContainer}>
            <Image style={styles.handleImage} />
          </View>
          <View style={styles.bottomSheetTitleContainer}>
            <Text style={styles.bottomSheetTextTitle}>CONSECTETUR ADISCIPIT</Text>
            {selectedItem && selectedItem.virksomhed && (
              <Text>{selectedItem.virksomhed.name}</Text>
            )}
          </View>
          <View style={styles.bottomSheetBreadTextContainer}>
            <Text style={styles.bottomSheetBreadText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              euismod tempor incididunt?
            </Text>
          </View>
        </View>
      </BottomSheet>
</>
    );
}

export default StandScreen;


const styles = StyleSheet.create({

    // BOTTOM SHEET
    bottomSheetMainContainer: {
      paddingTop: 10
    },
    handleContainer: {
      alignItems: 'center',
      paddingBottom: 20
    },
    handleImage: {
      width: 50,
      height: 7,
      backgroundColor: 'black',
      borderRadius: 30
    }
 

});