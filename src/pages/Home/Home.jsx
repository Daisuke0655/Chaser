import EditScript from "../EditScript/EditScript";
import SelectEnem from "../SelectEnem/SelectEnem";
import Match from "../Match/Match";
import { useParams} from 'react-router-dom';
import React, { useState, useRef } from "react";
import './Home.css'


const Home = () => {
    const { userId } = useParams()
    const [matchData, setMatchData] = useState([])
    const containerRef = useRef(null);

    const handleMatchData = (data) => {
        setMatchData(data)
    }


    return (
        <div className="home-style">
            <div className="select-container" ref={containerRef}>
                <div className="select-container-style">
                    <SelectEnem userId={userId}  onSetData={handleMatchData} />
                </div>
            </div>
            <div className="edit-container">
                <EditScript userId={userId} />
            </div>
        </div>
    );
}

export default Home;