import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useContext } from "react";
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from "../context/ThemeContext";
import { Ionicons } from '@expo/vector-icons';

const BookMeetingModal = ({ bookModalVisible, setBookModalVisible, selectedItem }) => {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext); 

  return (
      <Modal
          animationIn="slideInRight"
          animationInTiming={800}
          animationOut="slideOutRight"
          animationOutTiming={800}
          backdropTransitionInTiming={800}
          backdropTransitionOutTiming={800}
          swipeDirection="right"
          onSwipeComplete={() => setBookModalVisible(false)}
          isVisible={bookModalVisible}
          onRequestClose={() => {
              setBookModalVisible(!bookModalVisible);
          }}
          style={styles.cardModal}
      >
          <View style={[styles.centeredView, {backgroundColor: theme.backgroundColor}]}>
              <View style={[styles.modalView, {backgroundColor: theme.backgroundColor}]}>
                  <View style={styles.goBackContainer}>
                      <TouchableOpacity onPress={() => setBookModalVisible(!bookModalVisible)}>
                          <Ionicons name="chevron-back" size={24} color={theme.textColor} />
                      </TouchableOpacity>
                  </View>
                  <View style={styles.mainContentContainer}>
                      <Text style={[styles.modalTextTitle, { color: theme.textColor }]}>{selectedItem.name}</Text>
                      <Text style={[styles.modalTextBody, { color: theme.textColor }]}>Additional information about the selected item goes here...</Text>
                  </View>
              </View>
          </View>
      </Modal>
  );
};

export default BookMeetingModal;

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
  goBackContainer: {},
  mainContentContainer: {},
  modalTextTitle: {
      fontSize: 24,
      fontWeight: "bold",
  },
  modalTextBody: {},
});
