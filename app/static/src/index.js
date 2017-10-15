import { h, render } from 'preact';

import Header from './components/header';

import './index.css';

let bar = 'heyeeeeeey';

render((
    <div id="foo">
        <Header foo={bar} />
        <span>Hello, world!</span>
        <button onClick={ e => bar = 'asjdflkajshdflkjahsdkf' }>Click Me</button>
    </div>
), document.body);
