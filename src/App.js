import React from "react";
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";


const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />}></Route>
                    <Route path="/home/:userId" element={<Home />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App

