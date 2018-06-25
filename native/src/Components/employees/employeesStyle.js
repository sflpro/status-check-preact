import { StyleSheet } from 'react-native';

export default StyleSheet.create({

    employees: {
        flex: 1,
        flexDirection: 'column',
    },

    employee: {
        height: 100,
        margin: 5,
        backgroundColor: '#f2f2f2',
        alignSelf: 'stretch',
    },

    employee__name: {
        padding: 10,
        fontSize: 42,
        fontWeight: 'bold',
    },

    employee__date: {
        padding: 10,
        fontSize: 30,
        fontWeight: 'bold',
    },
});