import React from "react";
import Login from "./components/Login/Login";
import { BrowserRouter, Routes, Route} from "react-router-dom";


const App = () =>{
    return(
        <div>
            <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}></Route>
            </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App