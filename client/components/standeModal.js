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
    ImageBackground,
    StatusBar,
  } from "react-native";
  import React, { useState, useEffect, useContext } from "react";
  import { useNavigation } from '@react-navigation/native';
  import Modal from 'react-native-modal';
  
  // Image
  import img1 from "../assets/images/Shop_transparent.png";
  import img2 from "../assets/images/a1a1a1a1a1.png";
  import arrowCloseButton from "../assets/images/Arrow_close_button.png";
  import img3 from "../assets/images/O8G7CP0.png";

  // CONTEXT
  import { ThemeContext } from "../context/ThemeContext";

  // ICONS 
  import { Ionicons, Entypo, MaterialCommunityIcons  } from '@expo/vector-icons';


const StandeModal = ({modalVisible, setModalVisible, selectedItem, setSelectedItem}) => {
    // DARKMODE
    const { theme, toggleTheme } = useContext(ThemeContext); 

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
        animationIn="slideInRight"
     animationInTiming={800}
     animationOut="slideOutRight"
     animationOutTiming={700}
     backdropTransitionInTiming={800}
     backdropTransitionOutTiming={700}
     swipeDirection="right"
     onSwipeComplete={() => setModalVisible(false)}
     isVisible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        style={styles.standeModal}
      >  
      <StatusBar hidden={true} />
        <View style={[styles.centeredView, {backgroundColor: theme.backgroundColor}]}>
        
          <View style={[styles.modalView, {backgroundColor: theme.backgroundColor}]}>
           
       
          <View style={[styles.headerContainer, {backgroundColor: theme. subBackgroundColor}]}>

            <View style={styles.goBackContainer}>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <Ionicons  name="chevron-back" size={24} color={theme.textColor} />
            </TouchableOpacity>
         


          </View>
      
       
     </View>

      <View style={[styles.titleImageContainer, {backgroundColor: theme.subBackgroundColor}]}>
     <View style={styles.standTitleContainer}>
            <Text style={[styles.modalTextTitle, {color: theme.textColor}]}>{selectedItem.title}</Text>
           </View>

           <View style={styles.standImageContainer}>
            <Image style={styles.standImage} source={img3} />
           </View>
           </View>
         
     <View style={styles.informationContentContainer}>

 
            <View style={styles.textContainer}>
              <Text style={styles.informationTitle}>Information</Text>
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

            <View style={styles.buttonsMainContainer}>
            <View style={styles.standRedirectKnapContainer}>
              <TouchableOpacity style={[styles.standRedirectKnapTouch, {backgroundColor: theme.textColor}]} onPress={SendUserToStandScreen}>
                <Text style={[styles.standRedirectKnapText, {color: theme.backgroundColor}]}>Find Stand</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.standBookContainer}>
              <TouchableOpacity style={[styles.standBookKnapTouch, {backgroundColor: theme.textColor}]} onPress={SendTilBookStand}>
                <Text style={[styles.standBookText, {color: theme.backgroundColor}]}>Book</Text>
              </TouchableOpacity>
            </View>
            </View>


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
 standeModal: {
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
  // padding: 35,
  // paddingTop: 50,
  
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
  modalImageBackground: {
    height: windowHeight * 0.30,
    // width: "100%",
    paddingTop: 30,
    paddingLeft: 30,
  },
  headerContainer: {
    padding: 35,
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  informationContentContainer: {
    padding: 35,
  },
  modalStandImageContainer: {
    marginTop: 50,
  },
  standImageContainer: {
    alignItems: "center",
  },
  standImage: {
    width: windowWidth * 1,
    height: windowHeight * 0.50,
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
  standTitleContainer: {
    alignItems: "center",
  },
  modalTextTitle: {
    fontSize: 32,
  },
  modalTextBody: {
    marginTop: 10,
    color: "#9a98a4",
  },
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
  informationTitle: {
    fontSize: 18,
    fontWeight: "500",
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
  buttonsMainContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  standRedirectKnapContainer: {
    alignItems: 'center',
    marginTop: 25,
    
  },
  standRedirectKnapTouch: {
    // backgroundColor: 'black',
   borderRadius: 25,
   width: 130,
   alignItems: "center",
  },
  standRedirectKnapText: {
  // color: 'white',
  fontWeight: 'bold',
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  // BOOK KNAP
  standBookContainer: {
    alignItems: 'center',
    marginTop: 25,
  },
  standBookKnapTouch: {
    // backgroundColor: 'black',
    borderRadius: 25,
    width: 130,
    alignItems: "center",
  },
  standBookText: {
    // color: 'white',
  fontWeight: 'bold',
    paddingVertical: 10,
    paddingHorizontal: 25,
  },

})