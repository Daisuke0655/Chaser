import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";


const App = () =>{
    return(
        <div>
            <BrowserRouter>
            <Routes>
                <Route path="/" element={<null />}></Route>
            </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App