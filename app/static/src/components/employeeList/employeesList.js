import { h, Component } from 'preact';

import './employeesList.css';

export default class EmployeesList extends Component {
    formatDate = (milliseconds) => {
        var date = new Date(milliseconds-4*60*60*1000);
        var monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
        ];

        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds =  date.getSeconds();

        if(hours < 10) hours = "0"+hours;
        if(minutes < 10) minutes = "0"+minutes;
        if(seconds < 10) seconds = "0"+seconds;

        return day + ' ' + monthNames[monthIndex] + ' ' + year + ' ' + hours + ":"  + minutes + ":"  + seconds;
    }

    render(props) {
        console.log(props.employees);
        return (
            <div>
                {props.employees.map((employee) =>
                    <article class="employee">
                        <div class="employee__wrapper">
                            <img class="employee__avatar" src={'http://status.sflpro.com/assets/avatars/'+employee.fullName.replace(" ","-")+"-50x50.jpg"}/>
                            <h2 class="employee__name">{employee.fullName}</h2>
                            <p class="employee__date">{this.formatDate(Date.parse(employee.lastStatusChange))}</p>
                            <button class="employee__subscribe">
                                s
                            </button>
                        </div>
                    </article>
                )}
                <div class="clear"></div>
            </div>
            
        );
    }
}
