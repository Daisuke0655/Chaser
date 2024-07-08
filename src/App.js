import React from "react";
import './App.css'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import InitialPage from "./pages/Initial/Initial";
import Login from "./pages/Login/Login";
import Match from './pages/Match/Match'
import Home from "./pages/Home/Home";


const App = () =>{
    return(
        <div>
            <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}></Route>
                <Route path="/home/:userId"element = {<Home/>}></Route>
                <Route path="/match/:jsonData" element={<Match />}></Route>
            </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App

