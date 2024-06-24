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
  } from "react-native";
  import React, { useState, useEffect, useContext } from "react";
  import { useNavigation } from '@react-navigation/native';
  import Modal from 'react-native-modal';
  
  // Image
  import img1 from "../assets/images/Shop_transparent.png";
  import arrowCloseButton from "../assets/images/Arrow_close_button.png";
  import ImagePlaceHolder from "../assets/images/a1a1a1a1a1.png";

    // CONTEXT
 import { ThemeContext } from "../context/ThemeContext";

 // ICONS 
 import { Ionicons } from '@expo/vector-icons';
  


const NotificationModal = ({notificationModalVisible, setNotificationModalVisible }) => {
    const navigation = useNavigation();

       // DARKMODE
       const { theme, toggleTheme } = useContext(ThemeContext); 
  

    return ( 
        <>
        <Modal
     animationIn="slideInRight"
     animationInTiming={800}
     animationOut="slideOutRight"
     animationOutTiming={800}
     backdropTransitionInTiming={800}
     backdropTransitionOutTiming={800}
     swipeDirection="right"
     onSwipeComplete={() => setNotificationModalVisible(false)}
        isVisible={notificationModalVisible}
        onRequestClose={() => {
            setNotificationModalVisible(!notificationModalVisible);
        }}
        style={styles.cardModal}
      >
         <View style={[styles.centeredView, {backgroundColor: theme.backgroundColor}]}>
         <View style={[styles.modalView, {backgroundColor: theme.backgroundColor}]}>

         {/* <View style={styles.goBackContainer}>
            <TouchableOpacity onPress={() => setNotificationModalVisible(!notificationModalVisible)}>
            <Ionicons  name="chevron-back" size={24} color={theme.textColor} />
            </TouchableOpacity>
          </View> */}
         
         <View style={styles.headerContainer}>
          <View style={styles.goBackContainer}>
            <TouchableOpacity onPress={() => setNotificationModalVisible(!notificationModalVisible)}>
            <Ionicons  name="chevron-back" size={24} color={theme.textColor} />
            </TouchableOpacity>
          </View>

          <View style={styles.headerTitleContainer}>
            <Text style={[styles.headerTitle, {color: theme.textColor}]}>Notification</Text>
          </View>

          </View>  

          <View style={styles.contentContainer}>
            <View style={styles.notificationsContainer}>
                <View style={styles.imageContainer}>
                    <Image style={styles.imagePlaceholder}  source={ImagePlaceHolder} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={[styles.notificationText, {color: theme.textColor}]}>Dette er en test notification</Text>
                </View>
            </View>
          </View>
          
          <View
            style={[
              styles.viewLine,
              { backgroundColor: theme.subBackgroundColor },
            ]}
          ></View>

<View style={styles.contentContainer}>
            <View style={styles.notificationsContainer}>
                <View style={styles.imageContainer}>
                    <Image style={styles.imagePlaceholder}  source={ImagePlaceHolder} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={[styles.notificationText, {color: theme.textColor}]}>Dette er en test notification</Text>
                </View>
            </View>
          </View>
          
          <View
            style={[
              styles.viewLine,
              { backgroundColor: theme.subBackgroundColor },
            ]}
          ></View>


          </View>
        </View>
      </Modal>
      </>
    )

}

export default NotificationModal;

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;


const styles = StyleSheet.create({
 // Modal
 cardModal: {
    backgroundColor: 'white',
    margin: 0, 
 },
 centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: '100%',
    height: '100%',
    padding: 35,
    paddingTop: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  goBackContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  headerTitleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth * 0.7,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold', 
  },
  notificationsContainer: {
    flexDirection: "row",
  },
  imagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  textContainer: {
  marginLeft: 20,
  justifyContent: "center",
  },
    // Line
    viewLine: {
        height: 1,
        marginVertical: 10,
      },


})