export default class StaffService {
    static get(url, params = {}) {
        return StaffService.request(url, params);
    }
   
    static request(url, params = {}) {
        let req = new Request(url, {
            method: params.method || "GET", 
        });

        return fetch(req).then((resp) => {
            if(resp.status == 200){
                return resp.json()
            }
        })
    }

    // static get(){
    //     return new Promise((res, rej) => {
    //         const xhttp = new XMLHttpRequest();
    //         xhttp.open("GET", "api/staff", true);
    //         xhttp.send();
    //         xhttp.onload = () => {
    //             if (xhttp.status == 200 || xhttp.status == 202) {
    //                 const staff = JSON.parse(xhttp.responseText);
    //                 res(staff);
    //             } else {
    //                 rej('lllllll');
    //             }
    //         };
    //     })
    // }
}