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

const StandeModal = ({ modalVisible, setModalVisible, selectedItem }) => {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext); 
  const [virksomhedData, setVirksomhedData] = useState('');

  // MODAL
  const [bookingModalVisible, setBookModalVisible] = useState(false);


  const virksomhedId = selectedItem.virksomhed;

  useEffect(() => {
    console.log(virksomhedId);
    fetch(`https://messe-app-server.onrender.com/users/virksomhed/${virksomhedId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setVirksomhedData(data);
      })
      .catch((error) => console.error("Error:", error));
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
          <View style={[styles.centeredView, {backgroundColor: theme.backgroundColor}]}>
              <View style={[styles.modalView, {backgroundColor: theme.backgroundColor}]}>

                <View style={styles.imageBackgroundContainer}>
            <ImageBackground style={styles.imageBackground} source={img1}>
            <View style={styles.overlay} />
                  <View style={styles.goBackContainer}>
                      <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                      <AntDesign name="leftcircle" size={36} color={theme.backgroundColor} />
                      </TouchableOpacity>
                  </View>
                  </ImageBackground>
                  </View>

                  {/* <View style={styles.thumbnailImagesMainContainer}>
                    <View style={styles.thumbnailImageContainer}>
                      <Image style={styles.thumbnailImage} source={img2}/>
                    </View>
                    <View style={styles.thumbnailImageContainer}>
                      <Image style={styles.thumbnailImage} source={img3} />
                    </View>
                    <View style={styles.thumbnailImageContainer}>
                      <Image style={styles.thumbnailImage} source={img4}/>
                    </View>
                  </View> */}

                  <View  style={styles.mainContentContainer}>
                      <Text style={[styles.modalTextTitle, { color: theme.textColor }]}>{virksomhedData.name}</Text>
                      <Text style={[styles.modalTextBody, { color: theme.textColor }]}>{selectedItem.body}</Text>
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
              </View>
          </View>
          <BookMeetingModal bookingModalVisible={bookingModalVisible} setBookModalVisible={setBookModalVisible} virksomhedId={virksomhedId} setModalVisible={setModalVisible}  />
      </Modal>
  );
};

export default StandeModal;

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
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
    //   padding: 35,
    //   paddingTop: 50,
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
  },
  imageBackgroundContainer: {
    paddingHorizontal: 5,
    paddingTop: 35,
  },
  imageBackground: {
    width: "100%",
    height: windowHeight * 0.4,
    borderRadius: 40,
    overflow: 'hidden'

  },
  goBackContainer: {
    position: "absolute",
    top: 20,
    left: 20,
  },
 
  mainContentContainer: {
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  modalTextTitle: {
      fontSize: 32,
      fontWeight: "bold",
  },
  modalTextBody: {
    marginTop: 10,
  },
  goBackIcon: {
    width: 35,
    height: 35,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, 
    backgroundColor: 'rgba(0, 0, 0, 0.2)', 
  },
    // BOOK KNAP
    standBookContainer: {
      flexDirection: "row",
      justifyContent: "space-evenly",
        flex: 1,
        alignItems: 'center',
        marginTop: 25,
      },
      standBookKnapTouchStand: {
        borderRadius: 25,
        alignItems: "center",
        position: "absolute",
        bottom: 40,
        left: 20,
      },
      standBookKnapTouchBook: {
        borderRadius: 25,
        alignItems: "center",
        position: "absolute",
        bottom: 40,
        right: 20,
      },
      standBookTextStand: {
      fontWeight: 'bold',
        paddingVertical: 15,
        paddingHorizontal: 40,
        fontSize: 18,
      },
      standBookTextBook: {
        fontWeight: 'bold',
          paddingVertical: 15,
          paddingHorizontal: 60,
          fontSize: 18,
        },

        thumbnailImagesMainContainer: {
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginTop: 10,
        },
        thumbnailImageContainer: {
         
        },
        thumbnailImage: {
          width: 120,
          height: 80,
          borderRadius: 25,
        },
      
});
