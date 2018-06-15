import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createMaterialTopTabNavigator} from 'react-navigation'; // Version can be specified in package.json

class InOffice extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>In Office</Text>
            </View>
        );
    }
}

class OutOfOffice extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Out of Office</Text>
            </View>
        );
    }
}

export default createMaterialTopTabNavigator({
    In: { screen: InOffice },
    Out: { screen: OutOfOffice },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});