import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import InitialPage from "./pages/InitiaPage/InitialPage";
import Login from "./pages/Login/Login";


const App = () =>{
    return(
        <div>
            <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}></Route>
                <Route path="/initial" element={<InitialPage />}></Route>
            </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App