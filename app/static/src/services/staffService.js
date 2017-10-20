export default class StaffService {
    static get() {
        return new Promise((res, rej) => {
            const xhttp = new XMLHttpRequest();
            xhttp.open("GET", "api/staff", true);
            xhttp.send();
            xhttp.onload = () => {
                if (xhttp.status == 200 || xhttp.status == 202) {
                    const staff = JSON.parse(xhttp.responseText);
                    res(staff);
                } else {
                    rej('lllllll');
                }
            };
        })
    }

}