import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Image,
  } from "react-native";
  import React, { useContext, useEffect, useState } from "react";
  import Modal from 'react-native-modal';
  import { useNavigation } from '@react-navigation/native';
  import { ThemeContext } from "../context/ThemeContext";
  import { Ionicons } from '@expo/vector-icons';
  
  const ProgramModal = ({ programModalVisible, setProgramModalVisible, selectedProgramItem }) => {
    const navigation = useNavigation();

    // THEME
    const { theme } = useContext(ThemeContext); 


    const [virksomhedData, setVirksomhedData] = useState('');
  
  
  
    // const virksomhedId = selectedItem.virksomhed;
  
    // useEffect(() => {
    //   console.log("virksomhedId", virksomhedId);
    //   fetch(`https://messe-app-server.onrender.com/messer/getMesse/${virksomhedId}`, {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   })
    //     .then((response) => response.json())
    //     .then((data) => {
    //       setVirksomhedData(data);
    //     })
    //     .catch((error) => {
    //       console.error("Error:", error);
    //       alert("An error occurred while fetching the data. Please try again later.");
    //     });
    // }, [virksomhedId]);
  
    return (
        <Modal
            animationIn="slideInRight"
            animationInTiming={800}
            animationOut="slideOutRight"
            animationOutTiming={800}
            backdropTransitionInTiming={800}
            backdropTransitionOutTiming={800}
            isVisible={programModalVisible}
            onRequestClose={() => {
                setProgramModalVisible(!programModalVisible);
            }}
            style={styles.cardModal}
        >
            <View style={[styles.centeredView, {backgroundColor: theme.backgroundColor}]}>
                <View style={[styles.modalView, {backgroundColor: theme.backgroundColor}]}>
  
                <View style={styles.goBackContainer}>
              <TouchableOpacity onPress={() => setProgramModalVisible(!programModalVisible)}>
              <Ionicons  name="chevron-back" size={24} color={theme.textColor} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.infoMainContainer}>
              <View>
                <View style={styles.navnTitleContainer}>
                <Text style={styles.navnTitleText}>Navn</Text>
                <Text style={styles.navnText}>Navnplaceholder{}</Text>
                </View>
  
                <View style={styles.kategoriContainer}>
                <Text style={styles.kategoriTitleText}>Kategori</Text>
                <Text style={styles.kategoriText}>Grøn energi{}</Text>
                </View>
              </View>
  
              <View>
                <Image style={styles.standImage}  source={{ uri: selectedProgramItem.image }}/>
              </View>
  
            </View>
  
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>{selectedProgramItem.title}</Text>
            </View>
  
            
            <View style={styles.bodyContainer}>
                <Text style={styles.bodyText}>{selectedProgramItem.body}</Text>
            </View>
                     
              
                </View>
  
            </View>
        </Modal>
    );
  };
  
  export default ProgramModal;
  
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  
  const styles = StyleSheet.create({
   cardModal: {
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
      paddingHorizontal: 35,
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
    // GO BACK
    goBackContainer: {
      marginTop: 25,
    },
    // INFO
    infoMainContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      
      // paddingHorizontal: 15,
    },
    standImage: {
      width: 150,
      height: 150,
      borderRadius: 100,
    },
    navnTitleContainer: {
      marginTop: 50,
    },
    navnTitleText: {
      fontSize: 14,
    },
    navnText: {
      fontWeight: "bold",
      fontSize: 18,
    },
    kategoriContainer: {
      marginTop: 25,
    },
    kategoriTitleText: {
      fontSize: 14,
    },
    kategoriText: {
      fontWeight: "bold",
      fontSize: 18,
    },
    titleContainer: {
      marginTop: 50,
     
    },
    titleText: {
      fontSize: 40,
      fontWeight: "bold",
      textTransform: 'uppercase',
    },
    bodyContainer: {
      marginTop: 10,
      width: "75%",
    },
    bodyText: {
      fontSize: 14,
    },
      // BOOK KNAP
      standBookContainer: {
        // flex: 1,
        flexDirection: "row",
        justifyContent: "space-evenly",
        position: "absolute",
        bottom: 50,
        width: "100%",
        },
        standBookKnapTouchStand: {
          borderRadius: 25,
          paddingHorizontal: 25,
        },
        standBookKnapTouchBook: {
          borderRadius: 25,
          paddingHorizontal: 35,
        },
        standBookTextStand: {
        fontWeight: 'bold',
          paddingVertical: 15,
          paddingHorizontal: 10,
          fontSize: 18,
          width: "100%",
        },
        standBookTextBook: {
          fontWeight: 'bold',
            paddingVertical: 15,
            paddingHorizontal: 25,
            fontSize: 18,
            width: "100%",
          },
        
  });
  