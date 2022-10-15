import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { TimeContextProvider } from './store/time-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <TimeContextProvider>
        <App />
    </TimeContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
