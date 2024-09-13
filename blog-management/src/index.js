import {createRoot} from 'react-dom/client';
import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import App from "./App";
import MyContextProvider from "./MyContext";

const root = createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Router>
            <MyContextProvider>
                <App/>
            </MyContextProvider>
        </Router>
    </React.StrictMode>
)