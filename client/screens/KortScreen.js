import { View, Text, StyleSheet, Image, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";


const KortScreen = () => {

    return (
        <>
        <StatusBar style="dark" />
        <SafeAreaView style={styles.container}>
        <View>
            <Text>Kort</Text>
        </View>
        </SafeAreaView>
</>
    );
}

export default KortScreen;


const styles = StyleSheet.create({




});