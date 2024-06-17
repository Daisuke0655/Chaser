import React from "react";
import './App.css'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import InitialPage from "./pages/Initial/Initial";
import Login from "./pages/Login/Login";
import Log from "./pages/Log/Log"
import Match from './pages/Match/Match'
import SelectEnem from './pages/SelectEnem/SelectEnem'
import EditScript from "./pages/EditScript/EditScript"
import EditMap from "./pages/EditMap/EditMap"


const App = () =>{
    return(
        <div>
            <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}></Route>
                <Route path="/initial" element={<InitialPage />}></Route>
                <Route path="/log" element = {<Log />}></Route>
                <Route path="/edit" element = {<EditScript />}></Route>
                <Route path="/editMap" element = {<EditMap />}></Route>
                <Route path="/select" element = {<SelectEnem/>}></Route>
                <Route path="/match" element = {<Match/>}></Route>
            </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App