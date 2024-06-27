import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InitialPage from "./pages/Initial/Initial";
import Login from "./pages/Login/Login";
import Log from "./pages/Log/Log"
import Match from './pages/Match/Match'
import SelectEnem from './pages/SelectEnem/SelectEnem'
import EditScript from "./pages/EditScript/EditScript"
import Home from "./pages/Home/Home";
<<<<<<< HEAD

=======
>>>>>>> e865f659e178e6d39c5cdd8bbc63d7189386d55c

const App = () =>{
    return(
        <div>
            <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}></Route>
                <Route path="/initial" element={<InitialPage />}></Route>
                <Route path="/log" element = {<Log />}></Route>
                <Route path="/edit" element = {<EditScript />}></Route>
                <Route path="/select" element = {<SelectEnem/>}></Route>
<<<<<<< HEAD
                <Route path="/match/:jsonData" element = {<Match/>}></Route>
=======
                <Route path="/match" element = {<Match/>}></Route>
>>>>>>> e865f659e178e6d39c5cdd8bbc63d7189386d55c
                <Route path="/home/:userId"element = {<Home/>}></Route>
            </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
