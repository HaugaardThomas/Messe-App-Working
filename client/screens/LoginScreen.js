import { View, Text, StyleSheet, Image, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";


const LoginScreen = () => {

    return (
        <>
        <StatusBar style="dark" />
        <SafeAreaView style={styles.safeAreaViewContainer}>
        <View style={styles.mainContainer}>
            <Text>Login</Text>
        </View>
        </SafeAreaView>
</>
    );
}

export default LoginScreen;


const styles = StyleSheet.create({
    safeAreaViewContainer: {
        flex: 1,
        backgroundColor: "white",
      },
      mainContainer: {
        paddingTop: 50,
        paddingLeft: 35,
        paddingRight: 35,
      },




});