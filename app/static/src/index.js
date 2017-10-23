import {h, render} from 'preact';

import App from './components/app';


import './index.css';


render(<App />, document.body);

/*
StaffService.get().then(
    emp => {
        render(<App employees={emp}/>, document.body);

    }, er => {
        render(<div>Something went wrong </div>, document.body);
    }
);

*/




