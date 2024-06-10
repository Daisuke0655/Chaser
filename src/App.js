import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import InitialPage from "./pages/Initial/Initial";
import Login from "./pages/Login/Login";
import Log from "./pages/Log/Log"
import SelectEnem from "./pages/SelectEnem/SelectEnem"


const App = () =>{
    return(
        <div>
            <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}></Route>
                <Route path="/initial" element={<InitialPage />}></Route>
                <Route path="/log" element = {<Log />}></Route>
                <Route path="/selectEnem" element = {<SelectEnem/>}></Route>
            </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App