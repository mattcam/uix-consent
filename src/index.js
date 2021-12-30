import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const WidgetDivs = document.querySelectorAll('.tracardi-uix-consent')

WidgetDivs.forEach(Div => {
    ReactDOM.render(
        <React.StrictMode>
            <App domElement={Div} />
        </React.StrictMode>,
        Div
    );
})
