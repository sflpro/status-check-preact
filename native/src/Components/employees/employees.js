import React from 'react';
import { Text, View, Image, StyleSheet} from 'react-native';
// import { connect } from 'react-redux';

import { format, parse, addMilliseconds } from 'date-fns';

import { sflAvatarUrl } from '../../../config';

import styles from './employeesStyle';


export default class Employees extends React.Component {
    render() {
        const employees = [{"id":3,"name":"Ruben Dilanyan","status":"in","lastStatusChange":"2018-06-15T15:22:51.000Z"},{"id":7,"name":"Gevorg Tadevosyan","status":"in","lastStatusChange":"2018-06-15T14:54:49.000Z"},{"id":10,"name":"Arsen Gevorgyan","status":"in","lastStatusChange":"2018-06-15T15:34:56.000Z"},{"id":13,"name":"Lilit Melkumyan","status":"in","lastStatusChange":"2018-06-15T09:20:00.000Z"},{"id":14,"name":"Syuzanna Eprikyan","status":"in","lastStatusChange":"2018-06-15T13:41:45.000Z"},{"id":15,"name":"Varduhi Petrosyan","status":"in","lastStatusChange":"2018-06-15T10:36:34.000Z"},{"id":18,"name":"Vasil Mamikonyan","status":"in","lastStatusChange":"2018-06-15T15:49:59.000Z"},{"id":24,"name":"Stepan Smbatyan","status":"in","lastStatusChange":"2018-06-15T15:59:53.000Z"},{"id":26,"name":"Artur Baghdasaryan","status":"in","lastStatusChange":"2018-06-15T11:00:35.000Z"},{"id":31,"name":"Hayk Mkrtchyan","status":"in","lastStatusChange":"2018-06-15T12:57:42.000Z"},{"id":33,"name":"Vazgen Barseghyan","status":"in","lastStatusChange":"2018-06-15T14:00:49.000Z"},{"id":43,"name":"Nune Dadoyan","status":"in","lastStatusChange":"2018-06-15T11:00:35.000Z"},{"id":50,"name":"Anahit Tikin","status":"in","lastStatusChange":"2018-06-15T11:37:38.000Z"},{"id":66,"name":"Kristina Osipyan","status":"in","lastStatusChange":"2018-06-15T11:52:39.000Z"},{"id":82,"name":"Vazgen Danielyan","status":"in","lastStatusChange":"2018-06-15T14:18:47.000Z"},{"id":86,"name":"Mkhitaryan Gohar","status":"in","lastStatusChange":"2018-06-15T16:08:54.000Z"},{"id":87,"name":"Mher Sargsyan","status":"in","lastStatusChange":"2018-06-15T14:35:49.000Z"},{"id":88,"name":"Margarita Gevorgyan","status":"in","lastStatusChange":"2018-06-15T13:53:46.000Z"},{"id":90,"name":"Ararat Petrosyan","status":"in","lastStatusChange":"2018-06-15T14:36:49.000Z"},{"id":96,"name":"Anna Hovakimyan","status":"in","lastStatusChange":"2018-06-15T14:50:50.000Z"},{"id":111,"name":"Lilit Davidyan","status":"in","lastStatusChange":"2018-06-15T13:53:46.000Z"},{"id":115,"name":"Alfred Kaghyan","status":"in","lastStatusChange":"2018-06-15T14:00:49.000Z"},{"id":119,"name":"Gurgen Simonyan","status":"in","lastStatusChange":"2018-06-15T10:54:35.000Z"},{"id":127,"name":"Diana Melkumyan","status":"in","lastStatusChange":"2018-06-15T15:22:51.000Z"},{"id":132,"name":"Arthur Asatryan","status":"in","lastStatusChange":"2018-06-15T14:00:49.000Z"},{"id":133,"name":"Tatevik Mayilyan","status":"in","lastStatusChange":"2018-06-15T10:43:34.000Z"},{"id":145,"name":"Lilit Tadevosyan","status":"in","lastStatusChange":"2018-06-15T09:42:02.000Z"},{"id":148,"name":"Armine Hakobyan","status":"in","lastStatusChange":"2018-06-13T13:47:29.000Z"},{"id":152,"name":"Marat Avanesyan","status":"in","lastStatusChange":"2018-06-15T14:10:48.000Z"},{"id":155,"name":"Aram Arzumanyan","status":"in","lastStatusChange":"2018-06-15T14:00:49.000Z"},{"id":157,"name":"Sevan Elyasian","status":"in","lastStatusChange":"2018-06-15T11:36:38.000Z"},{"id":160,"name":"Ara Avanesyan","status":"in","lastStatusChange":"2018-06-15T10:21:35.000Z"},{"id":161,"name":"Karen Arakelyan","status":"in","lastStatusChange":"2018-06-15T14:09:47.000Z"},{"id":162,"name":"Nairi Narinyan","status":"in","lastStatusChange":"2018-06-15T14:23:48.000Z"},{"id":165,"name":"Anahit Ayvazyan","status":"in","lastStatusChange":"2018-06-15T12:59:43.000Z"},{"id":168,"name":"Hovhannes Gasparyan","status":"in","lastStatusChange":"2018-06-15T14:32:49.000Z"},{"id":169,"name":"Gevorg Martirosyan","status":"in","lastStatusChange":"2018-06-15T14:00:49.000Z"},{"id":170,"name":"Alisa Mkrtchyan","status":"in","lastStatusChange":"2018-06-15T13:48:47.000Z"},{"id":172,"name":"Davit Zakharyan","status":"in","lastStatusChange":"2018-06-15T14:32:49.000Z"},{"id":173,"name":"Gevorg Kazaryan","status":"in","lastStatusChange":"2018-06-15T08:55:59.000Z"},{"id":174,"name":"Sergey Yeranosyan","status":"in","lastStatusChange":"2018-06-15T17:10:57.000Z"},{"id":175,"name":"Sona Sahakyan","status":"in","lastStatusChange":"2018-06-15T17:10:57.000Z"},{"id":179,"name":"Davit Harutyunyan","status":"in","lastStatusChange":"2018-06-15T13:03:43.000Z"},{"id":184,"name":"Gevorg Baghdasaryan","status":"in","lastStatusChange":"2018-06-15T14:24:49.000Z"},{"id":185,"name":"Vardges Vardanyan","status":"in","lastStatusChange":"2018-06-15T11:11:36.000Z"},{"id":187,"name":"Levon Kostandyan","status":"in","lastStatusChange":"2018-06-15T15:17:51.000Z"},{"id":190,"name":"Armen Abovyan","status":"in","lastStatusChange":"2018-06-15T17:10:57.000Z"},{"id":193,"name":"Sahak Avdalyan","status":"in","lastStatusChange":"2018-06-15T14:09:47.000Z"},{"id":194,"name":"Khachatur Tovmasyan","status":"in","lastStatusChange":"2018-06-15T10:22:34.000Z"},{"id":196,"name":"Marta Ginosyan","status":"in","lastStatusChange":"2018-06-15T13:45:46.000Z"},{"id":197,"name":"Lusine Dashtoyan","status":"in","lastStatusChange":"2018-06-15T14:16:48.000Z"},{"id":198,"name":"Vahan Gevorgyan","status":"in","lastStatusChange":"2018-06-15T10:36:34.000Z"},{"id":199,"name":"Anna Minasyan","status":"in","lastStatusChange":"2018-06-15T10:15:33.000Z"},{"id":200,"name":"Hektor Khachatryan","status":"in","lastStatusChange":"2018-06-15T13:37:45.000Z"},{"id":201,"name":"Geras Ghulyan","status":"in","lastStatusChange":"2018-06-15T16:32:55.000Z"},{"id":202,"name":"Mariam Adamyan","status":"in","lastStatusChange":"2018-06-15T15:32:57.000Z"},{"id":204,"name":"Mher Azizbekyan","status":"in","lastStatusChange":"2018-06-15T09:46:32.000Z"},{"id":207,"name":"Ani Janamyan","status":"in","lastStatusChange":"2018-06-15T13:54:47.000Z"},{"id":209,"name":"Sargis Hovhannisyan","status":"in","lastStatusChange":"2018-06-15T14:30:49.000Z"},{"id":210,"name":"Lily Aghababyan","status":"in","lastStatusChange":"2018-06-14T09:54:09.000Z"},{"id":211,"name":"Hakob Hakobyan","status":"in","lastStatusChange":"2018-06-15T10:02:34.000Z"},{"id":212,"name":"Rafael Hovhannisyan","status":"in","lastStatusChange":"2018-06-15T11:28:37.000Z"},{"id":216,"name":"Taron Petrosyan","status":"in","lastStatusChange":"2018-06-15T13:34:45.000Z"},{"id":217,"name":"Ani Margaryan","status":"in","lastStatusChange":"2018-06-15T14:40:49.000Z"},{"id":218,"name":"Hovhannes Marikyan","status":"in","lastStatusChange":"2018-06-15T13:29:45.000Z"},{"id":219,"name":"Martin Khachatryan","status":"in","lastStatusChange":"2018-06-15T10:15:33.000Z"},{"id":220,"name":"Vahan Virapyan","status":"in","lastStatusChange":"2018-06-15T16:47:55.000Z"},{"id":223,"name":"Robert Hovsepyan","status":"in","lastStatusChange":"2018-06-15T09:20:00.000Z"},{"id":224,"name":"Nairi Harutyunyan","status":"in","lastStatusChange":"2018-06-15T09:30:01.000Z"},{"id":225,"name":"Tigran Hakobyan","status":"in","lastStatusChange":"2018-06-15T09:55:33.000Z"},{"id":226,"name":"Susanna Arsen","status":"in","lastStatusChange":"2018-06-15T14:53:49.000Z"},{"id":11,"name":"Ani Aghababyan","status":"out","lastStatusChange":"2018-06-15T14:19:43.000Z"},{"id":28,"name":"Yervand Aghababyan","status":"out","lastStatusChange":null},{"id":45,"name":"Arsen Gevorgyan","status":"out","lastStatusChange":null},{"id":51,"name":"Tigran Tserunyan","status":"out","lastStatusChange":null},{"id":64,"name":"Gurgen Arustamyan","status":"out","lastStatusChange":"2018-06-15T16:16:50.000Z"},{"id":75,"name":"Ruben Vardanyan","status":"out","lastStatusChange":null},{"id":85,"name":"Arpi Mikaelyan","status":"out","lastStatusChange":"2018-06-15T17:10:52.000Z"},{"id":95,"name":"Gagik Arustamyan","status":"out","lastStatusChange":"2018-06-15T11:42:34.000Z"},{"id":102,"name":"Noemi Nikoghosyan","status":"out","lastStatusChange":null},{"id":109,"name":"Lilit Mkrtchyan","status":"out","lastStatusChange":"2018-06-15T17:05:52.000Z"},{"id":134,"name":"Arman Gevorgyan","status":"out","lastStatusChange":null},{"id":137,"name":"Mary Mirzoyan","status":"out","lastStatusChange":"2018-06-15T15:40:48.000Z"},{"id":139,"name":"Aram Martirosyan","status":"out","lastStatusChange":"2018-06-13T15:51:00.000Z"},{"id":149,"name":"Vardges Stepanyan","status":"out","lastStatusChange":"2018-06-15T17:05:52.000Z"},{"id":150,"name":"Andranik Antonyan","status":"out","lastStatusChange":null},{"id":156,"name":"Tigran Tadevosyan","status":"out","lastStatusChange":null},{"id":166,"name":"Ruben Yeghikyan","status":"out","lastStatusChange":"2018-06-13T19:55:45.000Z"},{"id":167,"name":"Diana Gasparyan","status":"out","lastStatusChange":"2018-06-14T18:54:06.000Z"},{"id":171,"name":"Aram Aghababyan","status":"out","lastStatusChange":"2018-06-15T11:45:34.000Z"},{"id":181,"name":"Gevorg Petrosyan","status":"out","lastStatusChange":"2018-06-15T09:53:27.000Z"},{"id":186,"name":"Gayane Gasparyan","status":"out","lastStatusChange":"2018-06-14T19:59:09.000Z"},{"id":191,"name":"Arshak Avagyan","status":"out","lastStatusChange":"2018-06-15T15:03:46.000Z"},{"id":192,"name":"Shahen Mailyan","status":"out","lastStatusChange":"2018-06-13T19:28:43.000Z"},{"id":195,"name":"Aram Kirakosyan","status":"out","lastStatusChange":null},{"id":203,"name":"Karen G","status":"out","lastStatusChange":"2018-06-13T18:46:41.000Z"},{"id":205,"name":"Lilit Gyurjyan","status":"out","lastStatusChange":null},{"id":206,"name":"Karlen Mkrtchyan","status":"out","lastStatusChange":"2018-06-14T15:35:24.000Z"},{"id":213,"name":"Yeghishe Kartashyan","status":"out","lastStatusChange":"2018-06-14T19:17:06.000Z"},{"id":214,"name":"Norayr Legryan","status":"out","lastStatusChange":"2018-06-13T18:46:41.000Z"},{"id":215,"name":"Mikayel Ayvazyan","status":"out","lastStatusChange":"2018-06-15T17:10:52.000Z"},{"id":221,"name":"Grigor Seyranyan","status":"out","lastStatusChange":"2018-06-15T16:03:49.000Z"},{"id":222,"name":"Albert Tntesvar","status":"out","lastStatusChange":"2018-06-15T13:51:41.000Z"}];
        return (
            <View style={styles.employees}>
                {employees.length === 0 ? <Text>Out of Office</Text> :
                    employees.map(employee => {
                        return (
                            <View style={styles.employee} key={employee.id}>
                                <View>
                                    <Text className="employee__name">
                                        {employee.name}
                                    </Text>
                                    <Text className="employee__date">
                                        {employee.lastStatusChange ? format(addMilliseconds(parse(employee.lastStatusChange), -4 * 60 * 60 * 1000), 'DD MMMM YYYY HH:mm:ss') : 'long time ago'}
                                    </Text>
                                </View>
                            </View>
                        );
                    }
                )}
            </View>
        );
    }
}

// function filterEmployees(employees, filter) {
//     if (employees.length > 0) {
//         return employees.filter(employee => {
//             return employee.status === filter.toLowerCase();
//         });
//     }
//     return employees;
// }
//
// function mapProperties(state, ownProps) {
//     return {
//         employees: filterEmployees(state.employees, ownProps.filter)
//     }
// }
//
// export default connect(
//     mapProperties
// )(Employees);

// const styles = StyleSheet.create({
//     employee: {
//         height: 50,
//         width: 50,
//         backgroundColor: 'skyblue',
//     },
// });
