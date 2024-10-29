import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Image,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from "../context/ThemeContext";
import { Ionicons, AntDesign } from '@expo/vector-icons';

// IMAGES
import img1 from "../assets/images/a1a1a1a1a1.png";
import Arrow1 from "../assets/images/Arrow1.png";
import Arrow2 from "../assets/images/Arrow2.png";
import img2 from "../assets/images/people-reading-together-medium-shot.jpg";
import img3 from "../assets/images/still-life-care-products.jpg";
import img4 from "../assets/images/variety-premade-meals-supermarket-deli.jpg";

// MODAL
import BookMeetingModal from "./bookMeetingModal";

const StandeModal = ({ modalVisible, setModalVisible, selectedStandItem }) => {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext); 
  const [virksomhedData, setVirksomhedData] = useState('');

  // MODAL
  const [bookingModalVisible, setBookModalVisible] = useState(false);


  const virksomhedId = typeof selectedStandItem.virksomhed === 'object' && selectedStandItem.virksomhed !== null 
  ? selectedStandItem.virksomhed._id 
  : selectedStandItem.virksomhed;

  useEffect(() => {
    console.log("virksomhedId", virksomhedId);
    fetch(`https://messe-app-server.onrender.com/messer/getMesse/${virksomhedId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setVirksomhedData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while fetching the data. Please try again later.");
      });
  }, [virksomhedId]);

  return (
      <Modal
          animationIn="slideInRight"
          animationInTiming={800}
          animationOut="slideOutRight"
          animationOutTiming={800}
          backdropTransitionInTiming={800}
          backdropTransitionOutTiming={800}
          // swipeDirection="right"
          // onSwipeComplete={() => setModalVisible(false)}
          isVisible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
          style={styles.cardModal}
      >
           <View style={[styles.backDropImageBackground, {backgroundColor: theme.textColor}]}>

          </View>
          <ImageBackground resizeMode="cover"  imageStyle={{ borderTopRightRadius: 50, borderTopLeftRadius: 50}}  source={{ uri: selectedStandItem.image }} style={[styles.centeredView, {backgroundColor: theme.textColor}]}>
         
              <View style={[styles.modalView, {backgroundColor: theme.backgroundColor}]}>

              <View style={styles.goBackContainer}>
            <TouchableOpacity style={styles.goBackTouchContainer} onPress={() => setModalVisible(!modalVisible)}>
            <Ionicons  name="chevron-back" size={26} color={theme.textColor} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.infoMainContainer}>
            <View>
              <View style={styles.navnTitleContainer}>
              <Text style={[styles.navnTitleText, {color: theme.textColor2}]}>Navn</Text>
              <Text style={[styles.navnText, {color: theme.textColor}]}>Navnplaceholder{}</Text>
              </View>

              <View style={styles.kategoriContainer}>
              <Text style={[styles.kategoriTitleText, {color: theme.textColor2}]}>Kategori</Text>
              <Text style={[styles.kategoriText, {color: theme.textColor}]}>Grøn energi{}</Text>
              </View>
            </View>

            <View>
              <Image style={styles.standImage}  source={{ uri: selectedStandItem.image }}/>
            </View>

          </View>

          <View style={styles.titleContainer}>
              <Text style={[styles.titleText, {color: theme.textColor}]}>{selectedStandItem.title}</Text>
          </View>

          
          <View style={styles.bodyContainer}>
              <Text style={[styles.bodyText, {color: theme.textColor}]}>{selectedStandItem.body}</Text>
          </View>


              
                  
            
              </View>

              <View style={styles.standBookContainer}>
                  <TouchableOpacity style={[styles.standBookKnapTouchStand, {backgroundColor: theme.textColor}]}>
                <Text style={[styles.standBookTextStand, {color: theme.backgroundColor}]}>Find Stand</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.standBookKnapTouchBook, {backgroundColor: theme.textColor}]}
              onPress={() => {
                setBookModalVisible(true);
              }}
              >
                <Text style={[styles.standBookTextBook, {color: theme.backgroundColor}]}>Book</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
          <BookMeetingModal bookingModalVisible={bookingModalVisible} setBookModalVisible={setBookModalVisible} virksomhedId={virksomhedId} setModalVisible={setModalVisible}  />
      </Modal>
  );
};

export default StandeModal;

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
    width: windowWidth * 1,
    height: windowHeight * 0.32,
    
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
    backgroundColor: "red",
    marginTop: 450,
    borderRadius: 50,
  },
  // GO BACK
  goBackTouchContainer: {
    backgroundColor: "red",
    // borderRadius: 25,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    backgroundColor: "#CCDDDC",
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
        backDropImageBackground: {
          height: 50,
          width: "100%",
        },
});
