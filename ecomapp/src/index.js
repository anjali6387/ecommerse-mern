import React from 'react';
import {BrowserRouter} from "react-router-dom"
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux"
import {store,persistor} from './redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import App from './App';

window.store1 = store;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
<BrowserRouter>
 <App />
 <ToastContainer/>
</BrowserRouter>
 </PersistGate>
</Provider>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
