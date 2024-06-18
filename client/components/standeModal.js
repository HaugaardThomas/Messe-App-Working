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
    Modal,
    Dimensions,
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import { useNavigation } from '@react-navigation/native';
  
  // Image
  import img1 from "../assets/images/Shop_transparent.png";
  import arrowCloseButton from "../assets/images/Arrow_close_button.png";
  


const StandeModal = ({modalVisible, setModalVisible, selectedItem, setSelectedItem}) => {
    const navigation = useNavigation();
    const [isFullTextShown, setIsFullTextShown] = useState(false);

    const SendUserToStandScreen = () => {
        navigation.navigate('StandScreen');
        setModalVisible(!modalVisible);
      };

      const SendTilBookStand = () => {
        navigation.navigate('BookStandScreen');
        setModalVisible(!modalVisible);
      }
    
      const renderTextBody = (text) => {
        if (isFullTextShown || !text) {
          return text;
        }
    
        const words = text.split(" ");
        if (words.length > 35) {
          return words.slice(0, 35).join(" ") + "...";
        }
    
        return text;
      };

    return ( 
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Image source={arrowCloseButton}/>
            </TouchableOpacity>
            <View style={styles.modalImageContainer}>
              <Image source={img1} style={styles.modalImage} />
            </View>
            <Text style={styles.modalTextTitle}>{selectedItem.title}</Text>
            <View style={styles.textContainer}>
              <Text style={styles.modalTextBody}>
                {renderTextBody(selectedItem.body)}
              </Text>
              {selectedItem.body &&
                selectedItem.body.split(" ").length > 35 && (
                  <TouchableOpacity
                    onPress={() => setIsFullTextShown(!isFullTextShown)}
                  >
                    <Text style={styles.readMoreText}>
                      {isFullTextShown ? "Vis Mindre" : "Læs Mere"}
                    </Text>
                  </TouchableOpacity>
                )}
            </View>
            <View style={styles.standRedirectKnapContainer}>
              <TouchableOpacity style={styles.standRedirectKnapOuterBorder}>
              <TouchableOpacity style={styles.standRedirectKnapTouch} onPress={SendUserToStandScreen}>
                <Text style={styles.standRedirectKnapText}>Find Stand</Text>
              </TouchableOpacity>
              </TouchableOpacity>
            </View>
            <View style={styles.standBookContainer}>
              <TouchableOpacity style={styles.standBookOuterBorder}>
              <TouchableOpacity style={styles.standBookKnapTouch} onPress={SendTilBookStand}>
                <Text style={styles.standBookText}>Book</Text>
              </TouchableOpacity>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    )

}

export default StandeModal;

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;


const styles = StyleSheet.create({
 // Modal
 centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.91,
    marginTop: 45,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  // Modal Image
  modalImageContainer: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  modalImage: {
    width: "100%",
  },
  modalImage: {
    width: 300,
    height: 200,
    marginBottom: 15,
  },
  // Button
  modalCloseButton: {
    position: "absolute",
    left: 10,
    top: 10,
    borderRadius: 20,
    padding: 5,
    elevation: 2,
    backgroundColor: "black",
  },
  textCloseButton: {
    color: "white",
  },
  // Title and text content
  modalTextTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  modalTextBody: {},
  // Image
  imageContainer: {
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    marginLeft: 20,
    marginTop: -30,
  },
  itemImage: {
    width: 150,
    height: 100,
  },
  // Vis mere / mindre tekst
  readMoreText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  // Category selector
  categoryContainer: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 0,
    height: 50,
  },
  categoryButton: {
    padding: 10,
    paddingLeft: 5,
    marginHorizontal: 5,
    backgroundColor: "white",
    borderRadius: 18,
  },
  categoryButtonSelected: {
    backgroundColor: "white",
  },
  categoryButtonText: {
    color: "lightgrey",
    fontSize: 16,
  },
  categoryButtonTextSelected: {
    color: "black",
  },
  // DOT
  dotContainer: {
    height: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedCategoryDot: {
    height: 5,
    width: 5,
    borderRadius: 50,
    backgroundColor: "black",
    position: "absolute",
    bottom: 0,
  },
  // Find Stand knap
  standRedirectKnapContainer: {
    alignItems: 'center',
    marginTop: 25,
  },
  standRedirectKnapOuterBorder: {
    borderRadius: 25,
    padding: 2,
    borderWidth: 3,
  },
  standRedirectKnapTouch: {
    backgroundColor: 'black',
   borderRadius: 25,
  },
  standRedirectKnapText: {
  color: 'white',
  fontWeight: 'bold',
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  // BOOK KNAP
  standBookContainer: {
    alignItems: 'center',
    marginTop: 25,
  },
  standBookOuterBorder: {
    borderRadius: 25,
    padding: 2,
    borderWidth: 3,
  },
  standBookKnapTouch: {
    backgroundColor: 'black',
    borderRadius: 25,
  },
  standBookText: {
    color: 'white',
  fontWeight: 'bold',
    paddingVertical: 10,
    paddingHorizontal: 25,
  },

})