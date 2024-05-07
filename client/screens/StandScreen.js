import { View, Text, StyleSheet, Image, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";



const StandScreen = () => {

    return (
        <>
        <StatusBar style="dark" />
        <SafeAreaView style={styles.container}>
        <View>
            <Text>Stand</Text>
        </View>
        </SafeAreaView>
</>
    );
}

export default StandScreen;


const styles = StyleSheet.create({


});