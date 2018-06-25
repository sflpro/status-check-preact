import React from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import { createMaterialTopTabNavigator} from 'react-navigation'; // Version can be specified in package.json
import Employees from './src/Components/employees/employees'

class InOffice extends React.Component {
    render() {
        return (
            <ScrollView style={styles.container}>
                <Text>In Office</Text>
            </ScrollView>
        );
    }
}

class OutOfOffice extends React.Component {
    render() {
        return (
            <ScrollView style={styles.container}>
                <Employees />
            </ScrollView>
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
    },
});